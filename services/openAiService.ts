import OpenAI from "openai";

export class OpenAIService {
  private openai: OpenAI;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    const endpoint = process.env.OPENAI_API_ENDPOINT;

    console.log("OpenAI API Key:", apiKey); // Debug log
    console.log("OpenAI API Endpoint:", endpoint); // Debug log

    if (!apiKey || !endpoint) {
      throw new Error("OpenAI API key or endpoint is not defined in environment variables.");
    }

    this.openai = new OpenAI({
      apiKey,
      baseURL: endpoint, // Set the Azure OpenAI endpoint
    });
  }

  public async getChatResponse(prompt: string, maxTokens: number = 150): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o", // Use the appropriate model name
        messages: [
          { role: "system", content: "You are a helpful, friendly assistant." },
          { role: "user", content: prompt },
        ],
        max_tokens: maxTokens,
        temperature: 0.7,
      });

      return response.choices[0].message.content?.trim() || "No response.";
    } catch (error) {
      console.error("Error from OpenAI:", error);
      return "Sorry, I had trouble getting a response.";
    }
  }
}