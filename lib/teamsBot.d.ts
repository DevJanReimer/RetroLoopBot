import { TeamsActivityHandler } from "botbuilder";
export declare class TeamsBot extends TeamsActivityHandler {
    private openAiService;
    constructor(apiKey: string);
}
