import { createScreen, createTerminal } from "./lib";
import { initLayout } from "./lib/layout";

process.title = "plexing flexing relexing";

const screen = createScreen();

const layout = initLayout("dev");

const terminals = layout.map((config) => {
  return createTerminal({ config, screen });
});

screen.key("C-q", function () {
  terminals.forEach((terminal) => {
    terminal.destroy();
  });
  screen.render();
  return screen.destroy();
});

screen.program.key("S-tab", function () {
  screen.focusNext();
  screen.render();
});

// resize
screen.program.key("C-S-up", function () {
  // screen.focused.width = "20%";
});
screen.program.key("C-S-down", function () {
  // screen.focused.width = "50%";
});
screen.program.key("C-S-left", function () {
  // screen.focused.height = "60%";
});
screen.program.key("C-S-right", function () {
  // screen.focused.height = "100%";
});

screen.render();
