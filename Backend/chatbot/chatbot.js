const { v4: uuidv4 } = require('uuid');
const { InMemoryChatMessageHistory } = require("@langchain/core/chat_history");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { RunnableWithMessageHistory } = require("@langchain/core/runnables");
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");

// Store session chat histories
const messageHistories = {};

// Initialize the chatbot model
const model = new ChatGoogleGenerativeAI({
    modelName: "gemini-pro",
    maxOutputTokens: 2048,
});

// Define the chatbot prompt
const prompt = ChatPromptTemplate.fromMessages([
    [
        "system",
        `You are an AI programming assistant capable of debugging code, generating code solutions, and answering programming-related questions. 
        - **For debugging**: When the user provides code, analyze it for issues, suggest improvements, and explain the changes.
        - **For code generation**: Generate clean, efficient code based on the user's prompt, adhering to best practices.
        - **For general programming questions**: Answer any programming-related questions with clear and concise explanations.
        - Always ensure your solutions are efficient, well-structured, and follow best coding practices.
        - If additional information is needed for clarification or debugging, ask relevant follow-up questions.
        - Prioritize helpfulness and relevance in your responses while keeping explanations concise.`
    ],
    ["placeholder", "{chat_history}"],  // To include previous code snippets or conversation context
    ["human", "{input}"]  // Current user input, including code or programming question
]);

// Define the chain that connects the prompt to the model
const chain = prompt.pipe(model);

// Define the function to manage chat history and session
const withMessageHistory = new RunnableWithMessageHistory({
    runnable: chain,
    getMessageHistory: async (sessionId) => {
        if (messageHistories[sessionId] === undefined) {
            messageHistories[sessionId] = new InMemoryChatMessageHistory();
        }
        return messageHistories[sessionId];
    },
    inputMessagesKey: "input",
    historyMessagesKey: "chat_history",
});

// Function to handle chatbot logic
async function handleChat(userInput, sessionId) {
    // Process the user's input using the chatbot model
    const response = await withMessageHistory.invoke(
        { input: userInput },
        { configurable: { sessionId } }
    );

    return response.content;
}

// Function to generate a new session ID
function createNewSession() {
    return uuidv4();
}

// Export functions using CommonJS
module.exports = { handleChat, createNewSession };
