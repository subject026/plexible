var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/lib/createScreen.ts
var import_blessed = __toESM(require("@subject026/blessed"));
function createScreen() {
  return import_blessed.default.screen({
    smartCSR: true,
    log: process.env.NODE_ENN === "development" ? process.cwd() + "/blessed-terminal.log" : void 0,
    fullUnicode: true,
    dockBorders: true,
    ignoreDockContrast: true
  });
}

// src/lib/createTerminal.ts
var import_blessed2 = __toESM(require("@subject026/blessed"));
function createTerminal({
  config,
  screen: screen2
}) {
  const newTerminal = import_blessed2.default.terminal({
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
var import_path = __toESM(require("path"));
function getConfig() {
  const currentDir = process.cwd();
  const config = require(import_path.default.join(
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
