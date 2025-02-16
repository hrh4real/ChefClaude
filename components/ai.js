// ai.js
import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`

// Use import.meta.env instead of process.env for Vite
const API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;

// Safely initialize HuggingFace with error handling
let hf;
try {
  if (!API_KEY) {
    throw new Error('HuggingFace API key is not defined');
  }
  hf = new HfInference(API_KEY);
} catch (error) {
  console.error('Failed to initialize HuggingFace:', error);
}

export async function getRecipeFromMistral(ingredientsArr) {
  if (!hf) {
    throw new Error('HuggingFace client is not initialized');
  }
  
  const ingredientsString = ingredientsArr.join(", ");
  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mistral-7B-Instruct-v0.3",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
      ],
      max_tokens: 1024,
    });
    return response.choices[0].message.content;
  } catch (err) {
    console.error('Error getting recipe:', err.message);
    throw err;
  }
}