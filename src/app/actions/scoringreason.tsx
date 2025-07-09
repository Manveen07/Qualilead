"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

// Helper function for creating a delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const generateScoringReason = async (userPrompt: string) => {
  // --- Basic Input Validation ---
  if (!userPrompt?.trim()) {
    console.error("❌ Error: User prompt cannot be empty.");
    return {
      status: 400, // Bad Request
      error: "User prompt cannot be empty.",
    };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("❌ Error: GEMINI_API_KEY environment variable is not set.");
    return {
      status: 500,
      error: "Server configuration error: Missing API key.",
    };
  }

  // --- Retry Logic ---
  const maxRetries = 3;
  let currentRetry = 0;
  let backoffDelay = 1000; // Start with a 1-second delay

  while (currentRetry < maxRetries) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash", // You can also switch this to "gemini-pro"
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
        },
      });

      const result = await model.generateContent(userPrompt); // Simpler way to pass the prompt
      const response = result.response;

      if (!response) {
        throw new Error("No response object from Gemini API.");
      }

      const text = response.text();

      if (!text || text.trim() === "") {
        throw new Error("No response text received from Gemini API.");
      }

      console.log("✅ Gemini response text:", text);
      // Success! Return the result and exit the loop.
      return { status: 200, text: text.trim() };
    } catch (error: unknown) {
      currentRetry++;
      console.warn(
        `❌ Gemini Error (Attempt ${currentRetry}/${maxRetries}):`,
        error.message
      );

      // If this was the last attempt, return the final error
      if (currentRetry >= maxRetries) {
        console.error("❌ Gemini Error: Max retries reached. Failing.");
        return {
          status: 500,
          error: `Gemini API error after ${maxRetries} attempts: ${
            error?.message || "Unknown error"
          }`,
        };
      }

      // Wait before the next attempt
      console.log(`...retrying in ${backoffDelay / 1000} seconds.`);
      await delay(backoffDelay);
      backoffDelay *= 2; // Double the delay for the next retry
    }
  }

  // This part should technically be unreachable, but it's good practice for type safety
  return {
    status: 500,
    error: "An unknown error occurred after the retry loop.",
  };
};
