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
// Import required packages
const express_1 = __importDefault(require("express"));
// Import required bot services.
// See https://aka.ms/bot-services to learn more about the different parts of a bot.
const botbuilder_1 = require("botbuilder");
// This bot's main dialog.
const teamsBot_1 = require("./teamsBot");
const config_1 = __importDefault(require("./config"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env.local
dotenv_1.default.config({ path: "./env/.env.local" });
// Create adapter.
// See https://aka.ms/about-bot-adapter to learn more about adapters.
const credentialsFactory = new botbuilder_1.ConfigurationServiceClientCredentialFactory(config_1.default);
const botFrameworkAuthentication = new botbuilder_1.ConfigurationBotFrameworkAuthentication({}, credentialsFactory);
const adapter = new botbuilder_1.CloudAdapter(botFrameworkAuthentication);
// Catch-all for errors.
const onTurnErrorHandler = (context, error) => __awaiter(void 0, void 0, void 0, function* () {
    // This check writes out errors to console log .vs. app insights.
    // NOTE: In production environment, you should consider logging this to Azure
    //       application insights.
    console.error(`\n [onTurnError] unhandled error: ${error}`);
    // Only send error message for user messages, not for other message types so the bot doesn't spam a channel or chat.
    if (context.activity.type === "message") {
        // Send a trace activity, which will be displayed in Bot Framework Emulator
        yield context.sendTraceActivity("OnTurnError Trace", `${error}`, "https://www.botframework.com/schemas/error", "TurnError");
        // Send a message to the user
        yield context.sendActivity(`The bot encountered unhandled error:\n ${error.message}`);
        yield context.sendActivity("To continue to run this bot, please fix the bot source code.");
    }
});
// Set the onTurnError for the singleton CloudAdapter.
adapter.onTurnError = onTurnErrorHandler;
// Create the bot that will handle incoming messages.
const bot = new teamsBot_1.TeamsBot();
// Create express application.
const expressApp = (0, express_1.default)();
expressApp.use(express_1.default.json());
const port = process.env.PORT || 8080;
const server = expressApp.listen(port, () => {
    console.log(`\nBot Started, listening on port ${port}`);
});
// Listen for incoming requests.
expressApp.post("/api/messages", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield adapter.process(req, res, (context) => __awaiter(void 0, void 0, void 0, function* () {
        yield bot.run(context);
    }));
}));
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
});
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
//# sourceMappingURL=index.js.map