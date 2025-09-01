export enum LLMModelId {
  PerplexitySonar = "perplexity/sonar",
  ClaudeSonnet4 = "anthropic/claude-sonnet-4",
  GPT5 = "openai/gpt-5-chat",
}

export interface ResolvedModel {
  modelId: string;
  extraBody?: Record<string, unknown>;
}

export function resolveModel(defaultModelFromEnv?: string): ResolvedModel {
  const model = (defaultModelFromEnv ?? LLMModelId.PerplexitySonar).trim();

  if (model === LLMModelId.ClaudeSonnet4) {
    return {
      modelId: LLMModelId.ClaudeSonnet4,
      extraBody: {
        web_search: { enable: true },
      },
    };
  }

  if (model === LLMModelId.GPT5) {
    return {
      modelId: LLMModelId.GPT5,
      extraBody: {
        web_search: { enable: true },
      },
    };
  }

  return { modelId: model };
}
