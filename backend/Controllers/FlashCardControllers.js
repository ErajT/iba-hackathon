const Qexecution = require("./query");
const axios = require("axios");
const pdfParse = require('pdf-parse');
const fetch = require('node-fetch');
const {HfInference} = require("@huggingface/inference");
const { Pinecone } = require('@pinecone-database/pinecone');
const zlib = require('zlib');



// // Function 1: Create Standalone Question
// exports.createQuestion = async (userInp) => {
//     let llmRes;

//     try {
//         llmRes = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
//             model: "meta-llama/llama-3.1-8b-instruct:free",
//             messages: [
//                 { "role": "user", "content": userInp },
//                 { 
//                     "role": "system", 
//                     "content": "Convert the user's content into a STAND ALONE QUESTION. DO NOT SAY ANYTHING ELSE, JUST RETURN THE STANDALONE QUESTION." 
//                 }
//             ],
//         }, {
//             headers: {
//                 "Authorization": `Bearer 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`,
//                 "Content-Type": "application/json"
//             }
//         });

//         console.log("Standalone Question:", llmRes.data.choices[0].message.content);
//         return llmRes.data.choices[0].message.content;
//     }
//     catch (e) {
//         console.error("Error creating standalone question:", e.message);
//         return e;
//     }
// };



// // Function 2: Get Answer from PDF Context
// exports.getAnswerFromPDF = async (context, history, actualQuestion) => {
//     let llmRes;

//     try {
//         llmRes = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
//             model: "meta-llama/llama-3.1-8b-instruct:free",
//             messages: [
//                 { "role": "user", "content": actualQuestion },
//                 {
//                     "role": "system", 
//                     "content": `You are an expert whose knowledge is limited to the provided "Context" and "History". 
// You are **NOT** allowed to provide information outside of these sources. 

// Context: ${context}
// History: ${history}

// Important Notes:
// - If the answer is not found in either the "Context" or "History", politely state that the information is unavailable.
// - If a question is unrelated to the given data, respond with "I'm sorry, I don't have information on that."
// - Do not attempt to generate or guess information beyond what is provided.
// - Always provide concise and relevant answers.`
//                 }
//             ],
//         }, {
//             headers: {
//                 "Authorization": `Bearer ${process.env.OR_TOKEN}`,
//                 "Content-Type": "application/json"
//             }
//         });

//         console.log("LLM Response:", llmRes.data.choices[0].message.content);
//         return llmRes.data.choices[0].message;
//     }
//     catch (e) {
//         console.error("Error getting answer from PDF:", e.message);
//         return e;
//     }
// };



// // Function 3: API Endpoint to Interact with PDF
// exports.talkToPDF = async (req, res) => {
//     const { userInput, context, history } = req.body;

//     try {
//         // Step 1: Get Standalone Question
//         const actualQuestion = await exports.createQuestion(userInput);

//         // Step 2: Get Answer from PDF Context
//         const answer = await exports.getAnswerFromPDF(context, history, actualQuestion);

//         res.status(200).send({
//             status: "success",
//             question: actualQuestion,
//             answer: answer.content
//         });
//     }
//     catch (err) {
//         console.error("Error in talkToPDF:", err.message);
//         res.status(500).send({
//             status: "fail",
//             message: "Error interacting with the PDF.",
//             error: err.message
//         });
//     }
// };


// Function to Get Relevant Context from Pinecone
const getContextFromPinecone = async (materialId, userInput) => {
    try {
        const hf = new HfInference("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");
        // const hf = new HfInference("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");

        // Generate embedding for user input
        const queryEmbedding = await hf.featureExtraction({
            model: "sentence-transformers/all-MiniLM-L6-v2",
            inputs: userInput
        });
        
        const pc = new Pinecone({
            apiKey:"pcsk_5rfWQk_LsW5JHy3pkvgUMEhjMaHqcjSRAU4napaWESvpYYoFqaLyN3XFdiM7QLZF3GNjJG"
        });

        
        // const pc = new Pinecone({
        //     apiKey:"pcsk_2uTNgP_8U1KLAMgLhsnA93dMTxUU6cuSgVHxpmi5rKFYeX4MC4Bsgno4Aome3qaduf95i2"
        // });
        const indexName = `learnflow-${materialId}`;
        const index = pc.Index(indexName);
        
        // Query Pinecone for relevant context
        const queryResponse = await index.namespace(materialId.toString()).query({
            vector: queryEmbedding,
            topK: 3,  // Get top 3 most relevant chunks
            includeMetadata: true
        });
        
        const contexts = queryResponse.matches.map(match => match.metadata.text);
        // console.log(contexts)
        // Join contexts into a single string to pass to LLM
        const contextText = contexts.join(" ");
        // console.log("Extracted Context Text:", contextText);
        return contextText;
    } catch (e) {
        console.error("Error getting context from Pinecone:", e.message);
        throw new Error(e.message);
    }
};

// Function to Get Answer from PDF Context
const getAnswerFromPDF = async (context, actualQuestion) => {
    try {

        const llmRes = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
            model: "meta-llama/llama-3.3-70b-instruct:free",
            messages: [
                { "role": "user", "content": actualQuestion },
                {
                    "role": "system",
                    "content": `You are an expert whose knowledge is limited to the provided context. 
                    Context: ${context}
                    If the answer is not found, state that the information is unavailable.`
                }
            ],
        }, {
            headers: {
                "Authorization": `Bearer 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`,
                "Content-Type": "application/json"
            }
        });
        console.log("LLM Response:", llmRes);

        return llmRes.data.choices[0].message.content;
    } catch (e) {
        console.error("Error getting answer from PDF:", e.message);
        return e;
    }
};

// Updated API Endpoint
exports.talkToPDF = async (req, res) => {
    const { materialId, userInput } = req.body;

    try {
        // Step 1: Get Relevant Context from Pinecone
        const context = await getContextFromPinecone(materialId, userInput);

        console.log(context);

        // Step 2: Get Answer from PDF Context
        const answer = await getAnswerFromPDF( context, userInput);

        res.status(200).send({
            status: "success",
            materialId: materialId,
            question: userInput,
            answer: answer
        });
    } catch (err) {
        console.error("Error in talkToPDF:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error interacting with the PDF.",
            error: err.message
        });
    }
};


// Summarization Function
const summarizeContent = async (inp, min, max) => {
    // const hf = new HfInference("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")
    const hf = new HfInference("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");
    // console.log(inp);
    const res = await hf.summarization({
        model: 'google/pegasus-cnn_dailymail',
        inputs: inp,
        parameters: {
            max_length: 500,
            min_length: 250,
        }
    });
    console.log("abcd")
    return res;
};

// Function to generate flashcards for a given summary
const generateFlashcards = async (prompt) => {
    try {
        console.log(prompt)
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
        console.log("response is",flashcardsRes)
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

        const compressedBuffer = material[0].File;

        // Decompress the PDF buffer
        console.log('Decompressing PDF...');
        const pdfBuffer = zlib.gunzipSync(compressedBuffer);
        console.log("1")
        // Extract text from the PDF
        const pdfData = await pdfParse(pdfBuffer);
        const text = pdfData.text;
        console.log("2")
        // Clean the text
        const cleanedText = text.replace(/\s+/g, ' ').trim();
        console.log("3")
        // Summarize the text to approximately 500 words
        console.log('Summarizing content...');
        // console.log(cleanedText);
        const summarizedText = await summarizeContent(cleanedText, 400, 600);

        // console.log(summarizedText)

        // Send the summarized text to LLM to generate flashcards
        const txt = summarizedText.summary_text.replace(/\s+/g, ' ').trim();
        console.log('Generating flashcards...');
        const flashcards = await generateFlashcards(txt);

        return res.status(200).send({
            status: "success",
            message: "Flashcards generated successfully.",
            flashcards: JSON.parse(flashcards)
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

exports.payFastNotify = async (req, res) => {
    try {
        console.log("PayFast Notify Hit:", req.body);

        const {
            pf_payment_id,
            m_payment_id,
            payment_status
        } = req.body;

        if (payment_status !== "COMPLETE") {
            return res.status(400).send("Payment not completed");
        }

        if (!m_payment_id || !pf_payment_id) {
            return res.status(400).send("Missing payment ID");
        }

        await Qexecution.queryExecute(
            `UPDATE payments 
             SET status = 'paid', payfast_ref = ?
             WHERE paymentID = ?`,
            [pf_payment_id, m_payment_id]
        );

        return res.send("Payment processed successfully");
    } catch (err) {
        console.error("PayFast Notify Error:", err);
        return res.status(500).send("Error processing payment");
    }
};