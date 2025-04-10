import express from "express";
import { Request, Response, NextFunction } from "express";
import { TurnContext, CardFactory } from "botbuilder";

// Define the request body interface
interface AskQuestionRequest {
  question: string;
  options: string[];
}

export class BotApiService {
  private context: TurnContext | null = null;

  // Set the TurnContext for the current conversation
  public setContext(context: TurnContext): void {
    this.context = context;
  }

  // Method to ask a specific question
  public askQuestion(question: string, options: string[]): Promise<void> {
    if (!this.context) {
      return Promise.reject(new Error("TurnContext is not set. Cannot send a message."));
    }

    const card = CardFactory.heroCard(
      question,
      undefined,
      options.map((option) => ({
        type: "imBack",
        title: option,
        value: option,
      }))
    );

    return this.context.sendActivity({ attachments: [card] }).then(() => {});
  }

  // Start the REST API server
  public startServer(port: number): void {
    const app = express();

    // Middleware to parse JSON requests
    app.use(express.json());

    // POST endpoint to ask a question
    app.post("/api/askQuestion"), (req: Request, res: Response, next: NextFunction) => {
      const { question, options } = req.body as AskQuestionRequest;

      // Validate the request body
      if (!question || !options || !Array.isArray(options)) {
        return res.status(400).json({ error: "Invalid request. 'question' and 'options' are required." });
      }

      // Call the askQuestion method and handle the promise
      this.askQuestion(question, options)
        .then(() => {
          res.status(200).json({ message: "Question sent to the bot." });
        })
        .catch((error) => {
          console.error("Error in /api/askQuestion:", error);
          next(error); // Pass the error to the default error handler
        });
    });

    // Default error handler
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error("Unhandled error:", err.message);
      res.status(500).json({ error: "An unexpected error occurred." });
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Bot API server is running on http://localhost:${port}`);
    });
  }
}