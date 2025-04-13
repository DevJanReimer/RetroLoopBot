import { TurnContext } from "botbuilder";
export declare class BotApiService {
    private context;
    setContext(context: TurnContext): void;
    askQuestion(question: string, options: string[]): Promise<void>;
    startServer(port: number): void;
}
