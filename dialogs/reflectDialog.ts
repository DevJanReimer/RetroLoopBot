import { TurnContext, CardFactory } from "botbuilder";

export class ReflectDialog {
  public async run(context: TurnContext): Promise<void> {
    // Create a hero card with reflection categories
    const reflectCard = CardFactory.heroCard(
      "In what category would you like to reflect?",
      undefined,
      [
        { type: "imBack", title: "Individual Productivity", value: "Individual Productivity" },
        { type: "imBack", title: "Collaboration", value: "Collaboration" },
        { type: "imBack", title: "Processes", value: "Processes" },
        { type: "imBack", title: "Tooling & Resources", value: "Tooling & Resources" },
        { type: "imBack", title: "Well-being", value: "Well-being" },
      ]
    );

    // Send the card to the user
    await context.sendActivity({ attachments: [reflectCard] });
  }
}