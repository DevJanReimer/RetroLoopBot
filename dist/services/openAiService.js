"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    getChatResponse(prompt, maxTokens = 150) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.openai.chat.completions.create({
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
        });
    }
}
exports.OpenAIService = OpenAIService;
//# sourceMappingURL=openAiService.js.map