type Meta = Record<string, unknown> | undefined;

function fmt(meta: Meta): string {
  if (!meta || Object.keys(meta).length === 0) return "";
  try {
    return ` ${JSON.stringify(meta)}`;
  } catch {
    return "";
  }
}

export const chatLog = {
  info(message: string, meta?: Meta) {
    console.log(`[chat:info] ${message}${fmt(meta)}`);
  },
  warn(message: string, meta?: Meta) {
    console.warn(`[chat:warn] ${message}${fmt(meta)}`);
  },
  error(message: string, error?: unknown, meta?: Meta) {
    const err =
      error instanceof Error
        ? { name: error.name, message: error.message, stack: error.stack }
        : error;
    console.error(`[chat:error] ${message}${fmt({ ...meta, err })}`);
  },
};
