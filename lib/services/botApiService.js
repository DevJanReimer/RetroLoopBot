"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotApiService = void 0;
const express_1 = __importDefault(require("express"));
const botbuilder_1 = require("botbuilder");
const port = process.env.PORT || 8080; // Use the PORT environment variable or default to 8080
class BotApiService {
    constructor() {
        this.context = null;
    }
    // Set the TurnContext for the current conversation
    setContext(context) {
        this.context = context;
    }
    // Method to ask a specific question
    askQuestion(question, options) {
        if (!this.context) {
            return Promise.reject(new Error("TurnContext is not set. Cannot send a message."));
        }
        const card = botbuilder_1.CardFactory.heroCard(question, undefined, options.map((option) => ({
            type: "imBack",
            title: option,
            value: option,
        })));
        return this.context.sendActivity({ attachments: [card] }).then(() => { });
    }
    // Start the REST API server
    startServer(port) {
        const app = (0, express_1.default)();
        // Middleware to parse JSON requests
        app.use(express_1.default.json());
        // POST endpoint to ask a question
        app.post('/api/askQuestion', async (req, res) => {
            const { question, options } = req.body;
            // Validate the request body
            if (!question || !options || !Array.isArray(options)) {
                return res.status(400).json({ error: "Invalid request. 'question' and 'options' are required." });
            }
        });
        // Default error handler
        app.use((err, req, res, next) => {
            console.error("Unhandled error:", err.message);
            res.status(500).json({ error: "An unexpected error occurred." });
        });
        // Start the server
        app.listen(port, () => {
            console.log(`Bot API server is running on http://localhost:${port}`);
        });
    }
}
exports.BotApiService = BotApiService;
//# sourceMappingURL=botApiService.js.map