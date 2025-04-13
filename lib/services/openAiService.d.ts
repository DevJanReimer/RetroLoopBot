export declare class OpenAIService {
    private openai;
    constructor();
    getChatResponse(prompt: string, maxTokens?: number): Promise<string>;
}
