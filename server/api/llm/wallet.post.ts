import { createError, defineEventHandler, readBody } from "h3";
import OpenAI from "openai";
import type { LLMWalletPlatform } from "~/lib/schema";
import { llmLogger } from "../../utils/llm-logger";
import { resolveModel } from "./models";
import { buildPrompt } from "./prompt";

interface RequestBody {
  platformName?: string;
  note?: string;
}

// Minimal extension to allow OpenRouter-specific extra_body while keeping types strict
type ChatCompletionCreateParamsWithExtraBody = Omit<
  OpenAI.Chat.Completions.ChatCompletionCreateParams,
  "stream"
> & { extra_body?: Record<string, unknown> };

export default defineEventHandler(async (event): Promise<LLMWalletPlatform> => {
  const startTime = Date.now();
  const requestId = llmLogger.getRequestId();

  const config = useRuntimeConfig();
  const body = (await readBody(event)) as RequestBody;
  const platformName = body?.platformName;
  const note = body?.note;

  // Log request parameters
  llmLogger.logParams(
    {
      platformName,
      note,
      defaultModel: config.defaultLlmModel as string,
    },
    platformName
  );

  if (!platformName || typeof platformName !== "string") {
    llmLogger.logError("Invalid body: platformName is required", platformName);
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid body: platformName is required",
    });
  }

  const apiKey =
    process.env.OPENROUTER_API_KEY || (config.openrouterApiKey as string);
  if (!apiKey) {
    llmLogger.logError("Missing OpenRouter API key", platformName);
    throw createError({
      statusCode: 500,
      statusMessage: "Missing OpenRouter API key",
    });
  }

  const referer =
    (config.openrouterReferer as string) ||
    (config.public.$app_url as string) ||
    "";
  const title =
    (config.openrouterTitle as string) || "Pakistani Wallet Research Assistant";

  // Log configuration (without sensitive data)
  llmLogger.logConfig(
    {
      baseURL: "https://openrouter.ai/api/v1",
      referer,
      title,
      hasApiKey: !!apiKey,
    },
    platformName
  );

  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey,
    defaultHeaders: {
      ...(referer ? { "HTTP-Referer": referer } : {}),
      ...(title ? { "X-Title": title } : {}),
    },
  });

  const prompt = buildPrompt(platformName, note);
  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: "system", content: prompt },
    { role: "user", content: "Return ONLY the JSON object." },
  ];

  const { modelId, extraBody } = resolveModel(
    (config.defaultLlmModel as string) || undefined
  );

  // Log model configuration
  llmLogger.info(
    `Model resolved`,
    { modelId, extraBody },
    platformName,
    modelId
  );

  // Log prompt (truncated for readability)
  llmLogger.logPrompt(prompt, platformName, modelId);

  try {
    const createParams: ChatCompletionCreateParamsWithExtraBody = {
      model: modelId,
      messages,
      temperature: 0,
      ...(extraBody ? { extra_body: extraBody } : {}),
    };

    llmLogger.debug(
      `OpenAI create params`,
      {
        model: createParams.model,
        temperature: createParams.temperature,
        hasExtraBody: !!createParams.extra_body,
        messageCount: createParams.messages.length,
      },
      platformName,
      modelId
    );

    const completion = await openai.chat.completions.create(createParams);

    const content = completion.choices?.[0]?.message?.content?.trim() || "";
    const usage = completion.usage;
    const finishReason = completion.choices?.[0]?.finish_reason;

    // Log response details
    llmLogger.logResponse(content, platformName, modelId);
    llmLogger.info(
      `Response metadata`,
      { usage, finishReason },
      platformName,
      modelId
    );

    const tryParse = (text: string) => {
      const stripped = text.replace(/^```json\s*|```$/g, "").trim();
      return JSON.parse(stripped);
    };

    try {
      const parsedData = tryParse(content) as LLMWalletPlatform;

      const duration = Date.now() - startTime;

      // Log successful request
      llmLogger.logRequest({
        requestId,
        platformName,
        modelId,
        config: {
          apiKey: "[REDACTED]",
          baseURL: "https://openrouter.ai/api/v1",
          referer,
          title,
        },
        params: {
          platformName,
          note,
          defaultModel: config.defaultLlmModel as string,
        },
        prompt: {
          systemPrompt: prompt,
          userPrompt: "Return ONLY the JSON object.",
          fullPrompt: prompt + "\n\nReturn ONLY the JSON object.",
        },
        modelConfig: {
          modelId,
          temperature: 0,
          extraBody,
        },
        response: {
          content,
          usage,
          finishReason,
        },
        duration,
        success: true,
      });

      return parsedData;
    } catch {
      try {
        const sanitized = content
          .replace(/```[a-zA-Z]*\n([\s\S]*?)```/g, "$1")
          .trim();
        const parsedData = JSON.parse(sanitized) as LLMWalletPlatform;

        const duration = Date.now() - startTime;

        // Log successful request with sanitization
        llmLogger.logRequest({
          requestId,
          platformName,
          modelId,
          config: {
            apiKey: "[REDACTED]",
            baseURL: "https://openrouter.ai/api/v1",
            referer,
            title,
          },
          params: {
            platformName,
            note,
            defaultModel: config.defaultLlmModel as string,
          },
          prompt: {
            systemPrompt: prompt,
            userPrompt: "Return ONLY the JSON object.",
            fullPrompt: prompt + "\n\nReturn ONLY the JSON object.",
          },
          modelConfig: {
            modelId,
            temperature: 0,
            extraBody,
          },
          response: {
            content: sanitized,
            usage,
            finishReason,
          },
          duration,
          success: true,
        });

        return parsedData;
      } catch {
        const duration = Date.now() - startTime;

        // Log failed request
        llmLogger.logRequest({
          requestId,
          platformName,
          modelId,
          config: {
            apiKey: "[REDACTED]",
            baseURL: "https://openrouter.ai/api/v1",
            referer,
            title,
          },
          params: {
            platformName,
            note,
            defaultModel: config.defaultLlmModel as string,
          },
          prompt: {
            systemPrompt: prompt,
            userPrompt: "Return ONLY the JSON object.",
            fullPrompt: prompt + "\n\nReturn ONLY the JSON object.",
          },
          modelConfig: {
            modelId,
            temperature: 0,
            extraBody,
          },
          response: {
            content,
            usage,
            finishReason,
          },
          duration,
          success: false,
          error: "Model returned non-JSON output",
        });

        throw createError({
          statusCode: 502,
          statusMessage: "Model returned non-JSON output",
          data: { raw: content },
        });
      }
    }
  } catch (error: unknown) {
    const duration = Date.now() - startTime;
    const errorObj = error as {
      status?: number;
      message?: string;
      response?: { data?: unknown };
    };

    // Log error
    llmLogger.logError(error, platformName, modelId);

    // Log failed request
    llmLogger.logRequest({
      requestId,
      platformName,
      modelId,
      config: {
        apiKey: "[REDACTED]",
        baseURL: "https://openrouter.ai/api/v1",
        referer,
        title,
      },
      params: {
        platformName,
        note,
        defaultModel: config.defaultLlmModel as string,
      },
      prompt: {
        systemPrompt: prompt,
        userPrompt: "Return ONLY the JSON object.",
        fullPrompt: prompt + "\n\nReturn ONLY the JSON object.",
      },
      modelConfig: {
        modelId,
        temperature: 0,
        extraBody,
      },
      response: {
        content: "",
        usage: undefined,
        finishReason: undefined,
      },
      duration,
      success: false,
      error: errorObj?.message || "LLM request failed",
    });

    throw createError({
      statusCode: errorObj?.status || 500,
      statusMessage: errorObj?.message || "LLM request failed",
      data: errorObj?.response?.data || undefined,
    });
  }
});
