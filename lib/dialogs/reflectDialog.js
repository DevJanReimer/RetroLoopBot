"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReflectDialog = void 0;
const botbuilder_1 = require("botbuilder");
class ReflectDialog {
    async run(context) {
        // Create a hero card with reflection categories
        const reflectCard = botbuilder_1.CardFactory.heroCard("In what category would you like to reflect?", undefined, [
            { type: "imBack", title: "Individual Productivity", value: "Individual Productivity" },
            { type: "imBack", title: "Collaboration", value: "Collaboration" },
            { type: "imBack", title: "Processes", value: "Processes" },
            { type: "imBack", title: "Tooling & Resources", value: "Tooling & Resources" },
            { type: "imBack", title: "Well-being", value: "Well-being" },
        ]);
        // Send the card to the user
        await context.sendActivity({ attachments: [reflectCard] });
    }
}
exports.ReflectDialog = ReflectDialog;
//# sourceMappingURL=reflectDialog.js.map