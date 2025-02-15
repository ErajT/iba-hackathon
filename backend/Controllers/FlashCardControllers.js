const Qexecution = require("./query");
const constants = require('./constants');
const axios = require("axios");

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
                "Authorization": `Bearer ${process.env.OR_TOKEN}`,
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
