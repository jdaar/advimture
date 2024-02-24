export type LogLevel = "info" | "warn" | "error";

export function log(logLevel: LogLevel, message: string) {
    console.log(`[${logLevel.toUpperCase()}] ${message}`);
}
