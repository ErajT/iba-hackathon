const Qexecution = require("./query");
// const constants = require('./constants');
const axios = require("axios");
// controllers/flashcardController.js
const pdfParse = require('pdf-parse');
const fetch = require('node-fetch');

// Function 1: Create Standalone Question
exports.createQuestion = async (userInp) => {
    let llmRes;

    try {
        llmRes = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
            model: "meta-llama/llama-3.1-8b-instruct:free",
            messages: [
                { "role": "user", "content": userInp },
                { 
                    "role": "system", 
                    "content": "Convert the user's content into a STAND ALONE QUESTION. DO NOT SAY ANYTHING ELSE, JUST RETURN THE STANDALONE QUESTION." 
                }
            ],
        }, {
            headers: {
                "Authorization": `Bearer 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`,
                "Content-Type": "application/json"
            }
        });

        console.log("Standalone Question:", llmRes.data.choices[0].message.content);
        return llmRes.data.choices[0].message.content;
    }
    catch (e) {
        console.error("Error creating standalone question:", e.message);
        return e;
    }
};



// Function 2: Get Answer from PDF Context
exports.getAnswerFromPDF = async (context, history, actualQuestion) => {
    let llmRes;

    try {
        llmRes = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
            model: "meta-llama/llama-3.1-8b-instruct:free",
            messages: [
                { "role": "user", "content": actualQuestion },
                {
                    "role": "system", 
                    "content": `You are an expert whose knowledge is limited to the provided "Context" and "History". 
You are **NOT** allowed to provide information outside of these sources. 

Context: ${context}
History: ${history}

Important Notes:
- If the answer is not found in either the "Context" or "History", politely state that the information is unavailable.
- If a question is unrelated to the given data, respond with "I'm sorry, I don't have information on that."
- Do not attempt to generate or guess information beyond what is provided.
- Always provide concise and relevant answers.`
                }
            ],
        }, {
            headers: {
                "Authorization": `Bearer ${process.env.OR_TOKEN}`,
                "Content-Type": "application/json"
            }
        });

        console.log("LLM Response:", llmRes.data.choices[0].message.content);
        return llmRes.data.choices[0].message;
    }
    catch (e) {
        console.error("Error getting answer from PDF:", e.message);
        return e;
    }
};



// Function 3: API Endpoint to Interact with PDF
exports.talkToPDF = async (req, res) => {
    const { userInput, context, history } = req.body;

    try {
        // Step 1: Get Standalone Question
        const actualQuestion = await exports.createQuestion(userInput);

        // Step 2: Get Answer from PDF Context
        const answer = await exports.getAnswerFromPDF(context, history, actualQuestion);

        res.status(200).send({
            status: "success",
            question: actualQuestion,
            answer: answer.content
        });
    }
    catch (err) {
        console.error("Error in talkToPDF:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error interacting with the PDF.",
            error: err.message
        });
    }
};


// Function to dynamically detect topics based on headings and structure
const splitIntoDynamicTopics = (text) => {
    // Split by lines and check for potential topic headings
    const lines = text.split('\n');
    const topics = [];
    let currentTopic = { title: "Introduction", content: "" };

    lines.forEach(line => {
        // Check if the line could be a heading:
        // - Starts with capital letter and is short
        // - Ends with a colon or is in all caps
        // - Contains common heading keywords
        if (
            /^[A-Z][a-zA-Z0-9 ]{1,50}$/.test(line.trim()) || // Capitalized short line
            /^[A-Z ]+$/.test(line.trim()) || // All caps line
            /^(Chapter|Section|Topic|Conclusion|Summary|Introduction|[\d]+\.)/i.test(line.trim()) // Keywords
        ) {
            // If a new heading is found, save the previous topic
            if (currentTopic.content.length > 100) { // Only save meaningful content
                topics.push(currentTopic);
            }
            // Start a new topic
            currentTopic = { title: line.trim(), content: "" };
        } else {
            // Otherwise, add the line to the current topic content
            currentTopic.content += line + " ";
        }
    });

    // Push the last topic if it has content
    if (currentTopic.content.length > 100) {
        topics.push(currentTopic);
    }

    return topics;
};

// Function to generate flashcards for a given topic
const generateFlashcards = async (prompt) => {
    try {
        const flashcards = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer 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`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "meta-llama/llama-3.1-8b-instruct:free",
                "messages": [
                    {"role": "user", "content": prompt},
                    {"role": "system", "content": "Generate flashcards in JSON format for the content provided by user. Don't say any intro or conclusion, just return the JSON object strictly. Include both logical and definition-based questions."},
                ],
            })
        });

        const flashcardsRes = await flashcards.json();
        return flashcardsRes.choices[0].message.content;
    } catch (error) {
        console.error("Error generating flashcards:", error.message);
        return null;
    }
};

// Main controller to generate flashcards from Material table
exports.generateFlashcards = async (req, res) => {
    const { id } = req.params;

    // Get PDF from Material table
    const getPdfSQL = `
        SELECT File FROM Material WHERE MaterialID = ?
    `;

    try {
        const material = await Qexecution.queryExecute(getPdfSQL, [id]);

        if (material.length === 0) {
            return res.status(404).send({
                status: "fail",
                message: "Material not found."
            });
        }

        const pdfBuffer = material[0].File;
        const pdfData = await pdfParse(pdfBuffer);
        const text = pdfData.text;

        // Clean the text and split into dynamic topics
        const cleanedText = text.replace(/\s+/g, ' ').trim();
        const topics = splitIntoDynamicTopics(cleanedText);

        // Generate flashcards for each topic
        const flashcardsByTopic = {};
        for (const topic of topics) {
            // Limit input to avoid overflow
            const prompt = topic.content.substring(0, 5000);

            console.log(`Generating flashcards for: ${topic.title}`);
            const flashcards = await generateFlashcards(prompt);

            flashcardsByTopic[topic.title] = flashcards;
        }

        return res.status(200).send({
            status: "success",
            message: "Flashcards generated successfully.",
            flashcards: flashcardsByTopic
        });
    } catch (err) {
        console.error("Error generating flashcards:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error generating flashcards.",
            error: err.message,
        });
    }
};

