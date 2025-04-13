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
        this.onMembersAdded((context, next) => __awaiter(this, void 0, void 0, function* () {
            console.log("onMembersAdded event triggered");
            this.botApiService.setContext(context); // Set the context for the BotApiService
            yield this.openingDialog.run(context); // Trigger the OpeningDialog
            yield next();
        }));
        // Handle user responses
        this.onMessage((context, next) => __awaiter(this, void 0, void 0, function* () {
            this.botApiService.setContext(context); // Update the context for the BotApiService
            if (this.openingDialog.isActive()) {
                // Handle responses for the OpeningDialog
                yield this.openingDialog.handleResponse(context);
            }
            else {
                // ReflectDialog or other logic can be triggered here if needed
                console.log("Waiting for a POST request to ask a specific question.");
            }
            yield next();
        }));
    }
}
exports.TeamsBot = TeamsBot;
//# sourceMappingURL=teamsBot.js.map