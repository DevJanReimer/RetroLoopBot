"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamsBot = void 0;
const botbuilder_1 = require("botbuilder");
const openAiService_1 = require("../services/openAiService");
class TeamsBot extends botbuilder_1.TeamsActivityHandler {
    constructor(apiKey) {
        super();
        // Initialize OpenAIService with the API key
        this.openAiService = new openAiService_1.OpenAIService(apiKey);
        this.onMessage(async (context, next) => {
            console.log("Running with Message Activity.");
            // Remove the bot mention from the user's message
            const removedMentionText = botbuilder_1.TurnContext.removeRecipientMention(context.activity);
            const userMessage = removedMentionText === null || removedMentionText === void 0 ? void 0 : removedMentionText.toLowerCase().replace(/\n|\r/g, "").trim();
            // If the user sends "how are you", respond with ChatGPT
            if (userMessage === "how are you") {
                const openAiResponse = await this.openAiService.getResponse("The user asked: 'How are you?'. Respond in a friendly and conversational tone.");
                await context.sendActivity(openAiResponse);
            }
            else {
                // Echo the user's message
                await context.sendActivity(`Echo: ${userMessage}`);
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; cnt++) {
                if (membersAdded[cnt].id) {
                    await context.sendActivity(`Hi there! I'm a Teams bot powered by OpenAI. How are you doing today?`);
                    break;
                }
            }
            await next();
        });
    }
}
exports.TeamsBot = TeamsBot;
//# sourceMappingURL=teamsBot.js.map