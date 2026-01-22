 

// ChatApplication

import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

// 🧠 Conversation memory
const messages = [
  {
    role: "system",
    content: "short and small question."
  }
];

console.log("🤖 AI Chat Started");
console.log("Type 'exit' to quit\n");

// Read stdin
process.stdin.on("data", async (data) => {
  const userInput = data.toString().trim();

  if (userInput.toLowerCase() === "exit") {
    console.log("👋 Chat ended");
    process.exit(0);
  }

  // Save user message
  messages.push({
    role: "user",
    content: userInput
  });

  await aiAnswer();
});

async function aiAnswer() {
  try {
    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: messages
    });

    const aiText = response.output[0].content[0].text;

    // Save assistant message
    messages.push({
      role: "assistant",
      content: aiText
    });

    console.log("\nAI:", aiText);
    console.log("────────────────────────────\n");

  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

 



 

