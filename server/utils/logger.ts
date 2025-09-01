import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

interface LogEntry {
  timestamp: string;
  level: "INFO" | "WARN" | "ERROR" | "SUCCESS" | "DEBUG";
  message: string;
  data?: unknown;
  wallet?: string;
  duration?: number;
}

class BatchLogger {
  private logs: LogEntry[] = [];
  private startTime: number;
  private logDir: string;
  private logFile: string;

  constructor() {
    this.startTime = Date.now();
    this.logDir = path.join(process.cwd(), "server", "logs");
    this.logFile = path.join(
      this.logDir,
      `batch-${new Date().toISOString().split("T")[0]}-${Date.now()}.log`
    );
  }

  private async ensureLogDir(): Promise<void> {
    if (!existsSync(this.logDir)) {
      await mkdir(this.logDir, { recursive: true });
    }
  }

  private async writeToFile(): Promise<void> {
    await this.ensureLogDir();
    const logContent = this.logs
      .map(
        (log) =>
          `[${log.timestamp}] ${log.level}${log.wallet ? ` [${log.wallet}]` : ""}: ${log.message}${log.data ? ` | Data: ${JSON.stringify(log.data, null, 2)}` : ""}${log.duration ? ` | Duration: ${log.duration}ms` : ""}`
      )
      .join("\n");

    await writeFile(this.logFile, logContent, "utf-8");
  }

  private addLog(
    level: LogEntry["level"],
    message: string,
    data?: unknown,
    wallet?: string,
    duration?: number
  ): void {
    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      wallet,
      duration,
    };

    this.logs.push(logEntry);

    // Also log to console for immediate feedback
    const consoleMessage = `[${logEntry.timestamp}] ${level}${wallet ? ` [${wallet}]` : ""}: ${message}`;
    console.log(consoleMessage);

    // Write to file asynchronously
    this.writeToFile().catch(console.error);
  }

  info(message: string, data?: unknown, wallet?: string): void {
    this.addLog("INFO", message, data, wallet);
  }

  warn(message: string, data?: unknown, wallet?: string): void {
    this.addLog("WARN", message, data, wallet);
  }

  error(message: string, data?: unknown, wallet?: string): void {
    this.addLog("ERROR", message, data, wallet);
  }

  success(message: string, data?: unknown, wallet?: string): void {
    this.addLog("SUCCESS", message, data, wallet);
  }

  debug(message: string, data?: unknown, wallet?: string): void {
    this.addLog("DEBUG", message, data, wallet);
  }

  startWallet(wallet: string): void {
    this.info(`Starting processing for wallet`, { wallet }, wallet);
  }

  endWallet(wallet: string, result: unknown, duration: number): void {
    this.success(`Completed processing`, { result, duration }, wallet);
  }

  apiCall(wallet: string, url: string, method: string, body?: unknown): void {
    this.debug(`API call`, { url, method, body }, wallet);
  }

  apiResponse(wallet: string, response: unknown, duration: number): void {
    this.debug(`API response`, { response, duration }, wallet);
  }

  async finalize(): Promise<void> {
    const totalDuration = Date.now() - this.startTime;
    const summary = {
      totalWallets: this.logs.filter(
        (log) => log.level === "SUCCESS" && log.wallet
      ).length,
      totalErrors: this.logs.filter((log) => log.level === "ERROR").length,
      totalWarnings: this.logs.filter((log) => log.level === "WARN").length,
      totalDuration,
      logFile: this.logFile,
    };

    this.info(`Batch processing completed`, summary);

    // Write final summary
    const summaryContent = `
=== BATCH PROCESSING SUMMARY ===
Total Wallets Processed: ${summary.totalWallets}
Total Errors: ${summary.totalErrors}
Total Warnings: ${summary.totalWarnings}
Total Duration: ${totalDuration}ms
Log File: ${this.logFile}
===============================
`;

    await this.ensureLogDir();
    await writeFile(
      this.logFile,
      summaryContent +
        "\n" +
        this.logs
          .map(
            (log) =>
              `[${log.timestamp}] ${log.level}${log.wallet ? ` [${log.wallet}]` : ""}: ${log.message}${log.data ? ` | Data: ${JSON.stringify(log.data, null, 2)}` : ""}${log.duration ? ` | Duration: ${log.duration}ms` : ""}`
          )
          .join("\n"),
      "utf-8"
    );

    console.log(`\n📁 Log saved to: ${this.logFile}`);
  }
}

export const batchLogger = new BatchLogger();
