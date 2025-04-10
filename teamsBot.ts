import { TeamsActivityHandler, TurnContext } from "botbuilder";
import { OpeningDialog } from "./dialogs/openingDialog";
import { ReflectDialog } from "./dialogs/reflectDialog";
import { BotApiService } from "./services/botApiService";

export class TeamsBot extends TeamsActivityHandler {
  private openingDialog: OpeningDialog;
  private reflectDialog: ReflectDialog;
  private botApiService: BotApiService;

  constructor() {
    super();

    // Initialize the dialogs and services
    this.openingDialog = new OpeningDialog();
    this.reflectDialog = new ReflectDialog();
    this.botApiService = new BotApiService();

    // Start the Bot API server
    this.botApiService.startServer(3000); // Start the REST API server

    // Handle new members being added
    this.onMembersAdded(async (context: TurnContext, next) => {
      console.log("onMembersAdded event triggered");
      this.botApiService.setContext(context); // Set the context for the BotApiService
      await this.openingDialog.run(context); // Trigger the OpeningDialog
      await next();
    });

    // Handle user responses
    this.onMessage(async (context: TurnContext, next) => {
      this.botApiService.setContext(context); // Update the context for the BotApiService

      if (this.openingDialog.isActive()) {
        // Handle responses for the OpeningDialog
        await this.openingDialog.handleResponse(context);
      } else {
        // ReflectDialog or other logic can be triggered here if needed
        console.log("Waiting for a POST request to ask a specific question.");
      }

      await next();
    });
  }
}