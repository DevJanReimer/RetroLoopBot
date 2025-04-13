"use strict";
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
    async run(context) {
        this.isActiveDialog = true; // Mark the dialog as active
        const membersAdded = context.activity.membersAdded;

        // Check if membersAdded is defined before iterating
        if (membersAdded && membersAdded.length > 0) {
            for (let member of membersAdded) {
                if (member.id !== context.activity.recipient.id) {
                    // Welcome message
                    await context.sendActivity(`Hi there! I will be your assistant for reflecting on Sprints!`);
                    // Start asking the first question
                    await this.askNextQuestion(context);
                }
            }
        }
    }
    async handleResponse(context) {
        const userResponse = context.activity.text;
        // Log the user's response (you can store it in a database or memory)
        console.log(`User answered: ${userResponse}`);
        // Move to the next question
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < this.questions.length) {
            // Ask the next question
            await this.askNextQuestion(context);
        }
        else {
            // All questions are answered
            await context.sendActivity("Thank you for answering the questions!");
            this.isActiveDialog = false; // Mark the dialog as inactive
        }
    }
    async askNextQuestion(context) {
        const question = this.questions[this.currentQuestionIndex];
        const card = botbuilder_1.CardFactory.heroCard(question.text, undefined, question.options.map((option) => ({
            type: "imBack",
            title: option.title,
            value: option.value,
        })));
        await context.sendActivity({ attachments: [card] });
    }
    isActive() {
        return this.isActiveDialog;
    }
}
exports.OpeningDialog = OpeningDialog;
//# sourceMappingURL=openingDialog.js.map