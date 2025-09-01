import { existsSync, readFileSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

interface LLMLogEntry {
  timestamp: string;
  level: "INFO" | "WARN" | "ERROR" | "SUCCESS" | "DEBUG";
  message: string;
  data?: unknown;
  platformName?: string;
  modelId?: string;
  duration?: number;
  requestId?: string;
}

interface LLMRequestLog {
  requestId: string;
  platformName: string;
  modelId: string;
  config: {
    apiKey: string;
    baseURL: string;
    referer?: string;
    title?: string;
  };
  params: {
    platformName: string;
    note?: string;
    defaultModel?: string;
  };
  prompt: {
    systemPrompt: string;
    userPrompt: string;
    fullPrompt: string;
  };
  modelConfig: {
    modelId: string;
    temperature: number;
    extraBody?: Record<string, unknown>;
  };
  response: {
    content: string;
    usage?: {
      prompt_tokens?: number;
      completion_tokens?: number;
      total_tokens?: number;
    };
    finishReason?: string;
  };
  duration: number;
  success: boolean;
  error?: string;
}

class LLMLogger {
  private logDir: string;
  private requestId: string;

  constructor() {
    this.logDir = path.join(process.cwd(), "server", "logs", "llm");
    this.requestId = this.generateRequestId();
  }

  private generateRequestId(): string {
    return `llm-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private async ensureLogDir(): Promise<void> {
    if (!existsSync(this.logDir)) {
      await mkdir(this.logDir, { recursive: true });
    }
  }

  private getLogFile(): string {
    const date = new Date().toISOString().split("T")[0];
    return path.join(this.logDir, `llm-${date}.log`);
  }

  private async writeToFile(content: string): Promise<void> {
    await this.ensureLogDir();
    const logFile = this.getLogFile();

    // Append to existing file or create new one
    const existingContent = existsSync(logFile)
      ? readFileSync(logFile, "utf-8")
      : "";

    await writeFile(logFile, existingContent + content + "\n", "utf-8");
  }

  private addLog(
    level: LLMLogEntry["level"],
    message: string,
    data?: unknown,
    platformName?: string,
    modelId?: string,
    duration?: number
  ): void {
    const logEntry: LLMLogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      platformName,
      modelId,
      duration,
      requestId: this.requestId,
    };

    const logContent = `[${logEntry.timestamp}] ${level} [${this.requestId}]${platformName ? ` [${platformName}]` : ""}${modelId ? ` [${modelId}]` : ""}: ${message}${data ? ` | Data: ${JSON.stringify(data, null, 2)}` : ""}${duration ? ` | Duration: ${duration}ms` : ""}`;

    // Log to console for immediate feedback
    console.log(logContent);

    // Write to file asynchronously
    this.writeToFile(logContent).catch(console.error);
  }

  info(
    message: string,
    data?: unknown,
    platformName?: string,
    modelId?: string
  ): void {
    this.addLog("INFO", message, data, platformName, modelId);
  }

  warn(
    message: string,
    data?: unknown,
    platformName?: string,
    modelId?: string
  ): void {
    this.addLog("WARN", message, data, platformName, modelId);
  }

  error(
    message: string,
    data?: unknown,
    platformName?: string,
    modelId?: string
  ): void {
    this.addLog("ERROR", message, data, platformName, modelId);
  }

  success(
    message: string,
    data?: unknown,
    platformName?: string,
    modelId?: string
  ): void {
    this.addLog("SUCCESS", message, data, platformName, modelId);
  }

  debug(
    message: string,
    data?: unknown,
    platformName?: string,
    modelId?: string
  ): void {
    this.addLog("DEBUG", message, data, platformName, modelId);
  }

  logRequest(logData: LLMRequestLog): void {
    const summary = {
      requestId: logData.requestId,
      platformName: logData.platformName,
      modelId: logData.modelId,
      duration: logData.duration,
      success: logData.success,
      error: logData.error,
      usage: logData.response.usage,
      contentLength: logData.response.content.length,
    };

    const detailedLog = {
      ...logData,
      config: {
        ...logData.config,
        apiKey: logData.config.apiKey ? "[REDACTED]" : undefined,
      },
    };

    if (logData.success) {
      this.success(
        `LLM request completed`,
        summary,
        logData.platformName,
        logData.modelId
      );
      this.debug(
        `LLM request details`,
        detailedLog,
        logData.platformName,
        logData.modelId
      );
    } else {
      this.error(
        `LLM request failed`,
        summary,
        logData.platformName,
        logData.modelId
      );
      this.debug(
        `LLM request details`,
        detailedLog,
        logData.platformName,
        logData.modelId
      );
    }
  }

  logConfig(config: Record<string, unknown>, platformName?: string): void {
    this.info(`LLM configuration`, config, platformName);
  }

  logParams(params: Record<string, unknown>, platformName?: string): void {
    this.info(`LLM parameters`, params, platformName);
  }

  logPrompt(prompt: string, platformName?: string, modelId?: string): void {
    this.debug(
      `LLM prompt`,
      { prompt: prompt.substring(0, 500) + (prompt.length > 500 ? "..." : "") },
      platformName,
      modelId
    );
  }

  logResponse(
    response: unknown,
    platformName?: string,
    modelId?: string
  ): void {
    this.debug(
      `LLM response`,
      {
        response:
          typeof response === "string"
            ? response.substring(0, 500) + (response.length > 500 ? "..." : "")
            : response,
      },
      platformName,
      modelId
    );
  }

  logError(error: unknown, platformName?: string, modelId?: string): void {
    this.error(
      `LLM error`,
      { error: error instanceof Error ? error.message : error },
      platformName,
      modelId
    );
  }

  getRequestId(): string {
    return this.requestId;
  }
}

export const llmLogger = new LLMLogger();
