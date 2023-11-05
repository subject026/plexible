import path from "path";

export type TPlexibleConfigScript = {
  command: string;
  left: number | string;
  top: number | string;
  width: number | string;
  height: number | string;
};

export type TPlexibleConfigTask = {
  scripts: {
    [key: string]: TPlexibleConfigScript;
  };
};

export interface IPlexibleConfig {
  other: {
    [key: string]: {};
  };
  tasks: {
    [key: string]: TPlexibleConfigTask;
  };
}

export type TTerminal = {
  command: string;
  left: number | string;
  top: number | string;
  width: number | string;
  height: number | string;
};

export type TLayout = TTerminal[];

export function getConfig() {
  const currentDir = process.cwd();

  const config: IPlexibleConfig = require(path.join(
    currentDir,
    "plexible.config.js"
  ));

  if (!config) {
    console.log("config not found!");
    process.exit(1);
  }

  return { ...config };
}

/**
 * Takes taskname arg and pulls config.
 * Returns array of configs for each terminal/script
 * @param taskName
 */
export function initLayout(taskName: string): TLayout {
  const config = getConfig();
  const task = config.tasks[taskName];
  const scriptKeys = Object.keys(task.scripts);
  return scriptKeys.map((scriptKey) => {
    const terminalConfig = task.scripts[scriptKey];
    return {
      ...terminalConfig,
    };
  });
}
