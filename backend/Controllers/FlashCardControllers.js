const Qexecution = require("./query");
const axios = require("axios");

exports.createQuestion = async (userInp) => {
    let llmRes;

    try {
        llmRes = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
            model: "meta-llama/llama-3.1-8b-instruct:free",
            messages: [
                { "role": "user", "content": userInp },
                { "role": "system", "content": "Convert the user's content into a STAND ALONE QUESTION. DO NOT SAY ANYTHING ELSE, JUST RETURN THE STANDALONE QUESTION." }
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
