import { TurnContext } from "botbuilder";
export declare class OpeningDialog {
    private currentQuestionIndex;
    private isActiveDialog;
    private questions;
    run(context: TurnContext): Promise<void>;
    handleResponse(context: TurnContext): Promise<void>;
    private askNextQuestion;
    isActive(): boolean;
}
