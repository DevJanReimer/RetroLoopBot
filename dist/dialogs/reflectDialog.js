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
exports.ReflectDialog = void 0;
const botbuilder_1 = require("botbuilder");
class ReflectDialog {
    run(context) {
        return __awaiter(this, void 0, void 0, function* () {
            // Create a hero card with reflection categories
            const reflectCard = botbuilder_1.CardFactory.heroCard("In what category would you like to reflect?", undefined, [
                { type: "imBack", title: "Individual Productivity", value: "Individual Productivity" },
                { type: "imBack", title: "Collaboration", value: "Collaboration" },
                { type: "imBack", title: "Processes", value: "Processes" },
                { type: "imBack", title: "Tooling & Resources", value: "Tooling & Resources" },
                { type: "imBack", title: "Well-being", value: "Well-being" },
            ]);
            // Send the card to the user
            yield context.sendActivity({ attachments: [reflectCard] });
        });
    }
}
exports.ReflectDialog = ReflectDialog;
//# sourceMappingURL=reflectDialog.js.map