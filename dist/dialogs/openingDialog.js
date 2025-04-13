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
exports.OpeningDialog = void 0;
const botbuilder_1 = require("botbuilder");
class OpeningDialog {
    constructor() {
        this.currentQuestionIndex = 0; // Track the current question
        this.isActiveDialog = false; // Track if the dialog is active
        this.questions = [
            {
                text: "What is your role in the team?",
                options: [
                    { title: "Developer", value: "Developer" },
                    { title: "Tester", value: "Tester" },
                    { title: "Scrum Master", value: "Scrum Master" },
                    { title: "Product Owner", value: "Product Owner" },
                ],
            },
            {
                text: "How often would you like me to ask reflective questions?",
                options: [
                    { title: "Daily", value: "Daily" },
                    { title: "Weekly", value: "Weekly" },
                    { title: "After Each Sprint", value: "After Each Sprint" },
                ],
            },
        ];
    }
    run(context) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.isActiveDialog = true; // Mark the dialog as active
            const membersAdded = (_a = context.activity.membersAdded) !== null && _a !== void 0 ? _a : [];
            for (let member of membersAdded) {
                if (member.id !== context.activity.recipient.id) {
                    // Welcome message
                    yield context.sendActivity(`Hi there! I will be your assistant for reflecting on Sprints!`);
                    // Start asking the first question
                    yield this.askNextQuestion(context);
                }
            }
        });
    }
    handleResponse(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const userResponse = context.activity.text;
            // Log the user's response (you can store it in a database or memory)
            console.log(`User answered: ${userResponse}`);
            // Move to the next question
            this.currentQuestionIndex++;
            if (this.currentQuestionIndex < this.questions.length) {
                // Ask the next question
                yield this.askNextQuestion(context);
            }
            else {
                // All questions are answered
                yield context.sendActivity("Thank you for answering the questions!");
                this.isActiveDialog = false; // Mark the dialog as inactive
            }
        });
    }
    askNextQuestion(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const question = this.questions[this.currentQuestionIndex];
            const card = botbuilder_1.CardFactory.heroCard(question.text, undefined, question.options.map((option) => ({
                type: "imBack",
                title: option.title,
                value: option.value,
            })));
            yield context.sendActivity({ attachments: [card] });
        });
    }
    isActive() {
        return this.isActiveDialog;
    }
}
exports.OpeningDialog = OpeningDialog;
//# sourceMappingURL=openingDialog.js.map