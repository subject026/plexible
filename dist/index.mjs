var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// src/lib/createScreen.ts
import blessed from "@subject026/blessed";
function createScreen() {
  return blessed.screen({
    smartCSR: true,
    log: process.env.NODE_ENN === "development" ? process.cwd() + "/blessed-terminal.log" : void 0,
    fullUnicode: true,
    dockBorders: true,
    ignoreDockContrast: true
  });
}

// src/lib/createTerminal.ts
import blessed2 from "@subject026/blessed";
function createTerminal({
  config,
  screen: screen2
}) {
  const newTerminal = blessed2.terminal({
    ...config,
    parent: screen2,
    cursor: "block",
    cursorBlink: true,
    screenKeys: false,
    border: "line",
    style: {
      fg: "default",
      bg: "default",
      focus: {
        border: {
          fg: "green"
        }
      }
    },
    alwaysScroll: true,
    scrollable: true
    // scrollbar: {
    //   style: {
    //     color: "red",
    //   },
    // },
  });
  newTerminal.pty.on("data", function(data) {
    screen2.log(JSON.stringify(data));
  });
  newTerminal.on("click", newTerminal.focus.bind(newTerminal));
  newTerminal.enableDrag();
  newTerminal.on("title", (title) => {
    screen2.title = title;
    newTerminal.setLabel(" " + title + " ");
    screen2.render();
  });
  newTerminal.pty.write(`cd ${process.cwd()}\r`);
  newTerminal.pty.write(`${config.command}\r`);
  return newTerminal;
}

// src/lib/layout.ts
import path from "path";
function getConfig() {
  const currentDir = process.cwd();
  const config = __require(path.join(
    currentDir,
    "plexible.config.js"
  ));
  if (!config) {
    console.log("config not found!");
    process.exit(1);
  }
  return { ...config };
}
function initLayout(taskName) {
  const config = getConfig();
  const task = config.tasks[taskName];
  const scriptKeys = Object.keys(task.scripts);
  return scriptKeys.map((scriptKey) => {
    const terminalConfig = task.scripts[scriptKey];
    return {
      ...terminalConfig
    };
  });
}

// src/index.ts
process.title = "plexing flexing relexing";
var screen = createScreen();
var layout = initLayout("dev");
var terminals = layout.map((config) => {
  return createTerminal({ config, screen });
});
screen.key("C-q", function() {
  terminals.forEach((terminal) => {
    terminal.destroy();
  });
  screen.render();
  return screen.destroy();
});
screen.program.key("S-tab", function() {
  screen.focusNext();
  screen.render();
});
screen.program.key("C-S-up", function() {
});
screen.program.key("C-S-down", function() {
});
screen.program.key("C-S-left", function() {
});
screen.program.key("C-S-right", function() {
});
screen.render();
