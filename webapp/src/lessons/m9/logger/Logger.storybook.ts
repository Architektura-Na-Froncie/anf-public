import { action } from "@storybook/addon-actions";
import { Logger } from "./Logger.interface";

const send = action('logger')
export const StorybookLogger: Logger = {
  send,
  debug: (...args) => send('DEBUG', ...args),
  info: (...args) => send('INFO', ...args),
  warn: (...args) => send('WARN', ...args),
  error: (...args) => send('ERROR', ...args),
};
