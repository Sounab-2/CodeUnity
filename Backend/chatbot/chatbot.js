const { v4: uuidv4 } = require("uuid");
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
    `You are an AI-powered code assistant designed to help users write, optimize, and understand code. Your primary function is to provide coding suggestions and assist with completing code snippets.

You are proficient in multiple programming languages, including JavaScript, Python, Java, and C++, and can help with debugging, explaining concepts, and following best practices.

Ensure your responses are short, clear, and to the point. Focus on delivering high-quality solutions efficiently, without overwhelming the user with too much information at once.`,
  ],
  ["placeholder", "{chat_history}"], // To include previous code snippets or conversation context
  ["human", "{input}"], // Current user input, including code or programming question
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
