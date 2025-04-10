import { TurnContext, CardFactory } from "botbuilder";

export class OpeningDialog {
  private currentQuestionIndex: number = 0; // Track the current question
  private isActiveDialog: boolean = false; // Track if the dialog is active
  private questions: Array<{ text: string; options: Array<{ title: string; value: string }> }> = [
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

  public async run(context: TurnContext): Promise<void> {
    this.isActiveDialog = true; // Mark the dialog as active
    const membersAdded = context.activity.membersAdded;

    for (let member of membersAdded) {
      if (member.id !== context.activity.recipient.id) {
        // Welcome message
        await context.sendActivity(
          `Hi there! I will be your assistant for reflecting on Sprints!`
        );

        // Start asking the first question
        await this.askNextQuestion(context);
      }
    }
  }

  public async handleResponse(context: TurnContext): Promise<void> {
    const userResponse = context.activity.text;

    // Log the user's response (you can store it in a database or memory)
    console.log(`User answered: ${userResponse}`);

    // Move to the next question
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex < this.questions.length) {
      // Ask the next question
      await this.askNextQuestion(context);
    } else {
      // All questions are answered
      await context.sendActivity("Thank you for answering the questions!");
      this.isActiveDialog = false; // Mark the dialog as inactive
    }
  }

  private async askNextQuestion(context: TurnContext): Promise<void> {
    const question = this.questions[this.currentQuestionIndex];
    const card = CardFactory.heroCard(
      question.text,
      undefined,
      question.options.map((option) => ({
        type: "imBack",
        title: option.title,
        value: option.value,
      }))
    );

    await context.sendActivity({ attachments: [card] });
  }

  public isActive(): boolean {
    return this.isActiveDialog;
  }
}
