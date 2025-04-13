"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIService = void 0;
const openai_1 = __importDefault(require("openai"));
class OpenAIService {
    constructor() {
        const apiKey = process.env.OPENAI_API_KEY;
        const endpoint = process.env.OPENAI_API_ENDPOINT;
        console.log("OpenAI API Key:", apiKey); // Debug log
        console.log("OpenAI API Endpoint:", endpoint); // Debug log
        if (!apiKey || !endpoint) {
            throw new Error("OpenAI API key or endpoint is not defined in environment variables.");
        }
        this.openai = new openai_1.default({
            apiKey,
            baseURL: endpoint, // Set the Azure OpenAI endpoint
        });
    }
    async getChatResponse(prompt, maxTokens = 150) {
        var _a;
        try {
            const response = await this.openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                    { role: "system", content: "You are a helpful, friendly assistant." },
                    { role: "user", content: prompt },
                ],
                max_tokens: maxTokens,
                temperature: 0.7,
            });
            return ((_a = response.choices[0].message.content) === null || _a === void 0 ? void 0 : _a.trim()) || "No response.";
        }
        catch (error) {
            console.error("Error from OpenAI:", error);
            return "Sorry, I had trouble getting a response.";
        }
    }
}
exports.OpenAIService = OpenAIService;
//# sourceMappingURL=openAiService.js.map