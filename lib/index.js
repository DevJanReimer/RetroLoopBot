"use strict";
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
// Create adapter.
// See https://aka.ms/about-bot-adapter to learn more about adapters.
const credentialsFactory = new botbuilder_1.ConfigurationServiceClientCredentialFactory(config_1.default);
const botFrameworkAuthentication = new botbuilder_1.ConfigurationBotFrameworkAuthentication({}, credentialsFactory);
const adapter = new botbuilder_1.CloudAdapter(botFrameworkAuthentication);
// Catch-all for errors.
const onTurnErrorHandler = async (context, error) => {
    // This check writes out errors to console log .vs. app insights.
    // NOTE: In production environment, you should consider logging this to Azure
    //       application insights.
    console.error(`\n [onTurnError] unhandled error: ${error}`);
    // Only send error message for user messages, not for other message types so the bot doesn't spam a channel or chat.
    if (context.activity.type === "message") {
        // Send a trace activity, which will be displayed in Bot Framework Emulator
        await context.sendTraceActivity("OnTurnError Trace", `${error}`, "https://www.botframework.com/schemas/error", "TurnError");
        // Send a message to the user
        await context.sendActivity(`The bot encountered unhandled error:\n ${error.message}`);
        await context.sendActivity("To continue to run this bot, please fix the bot source code.");
    }
};
// Set the onTurnError for the singleton CloudAdapter.
adapter.onTurnError = onTurnErrorHandler;
// Create the bot that will handle incoming messages.
const bot = new teamsBot_1.TeamsBot();
// Create express application.
const expressApp = (0, express_1.default)();
expressApp.use(express_1.default.json());
const server = expressApp.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`\nBot Started, ${expressApp.name} listening to`, server.address());
});
// Listen for incoming requests.
expressApp.post("/api/messages", async (req, res) => {
    await adapter.process(req, res, async (context) => {
        await bot.run(context);
    });
});
//# sourceMappingURL=index.js.map