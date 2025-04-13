"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamsBot = void 0;
const botbuilder_1 = require("botbuilder");
const openingDialog_1 = require("./dialogs/openingDialog");
const reflectDialog_1 = require("./dialogs/reflectDialog");
const botApiService_1 = require("./services/botApiService");
class TeamsBot extends botbuilder_1.TeamsActivityHandler {
    constructor() {
        super();
        // Initialize the dialogs and services
        this.openingDialog = new openingDialog_1.OpeningDialog();
        this.reflectDialog = new reflectDialog_1.ReflectDialog();
        this.botApiService = new botApiService_1.BotApiService();
        // Start the Bot API server
        this.botApiService.startServer(3000); // Start the REST API server
        // Handle new members being added
        this.onMembersAdded(async (context, next) => {
            console.log("onMembersAdded event triggered");
            this.botApiService.setContext(context); // Set the context for the BotApiService
            await this.openingDialog.run(context); // Trigger the OpeningDialog
            await next();
        });
        // Handle user responses
        this.onMessage(async (context, next) => {
            this.botApiService.setContext(context); // Update the context for the BotApiService
            if (this.openingDialog.isActive()) {
                // Handle responses for the OpeningDialog
                await this.openingDialog.handleResponse(context);
            }
            else {
                // ReflectDialog or other logic can be triggered here if needed
                console.log("Waiting for a POST request to ask a specific question.");
            }
            await next();
        });
    }
}
exports.TeamsBot = TeamsBot;
//# sourceMappingURL=teamsBot.js.map