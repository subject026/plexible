import blessed from "@subject026/blessed";
import { TTerminal } from "./layout";

export function createTerminal({
  config,
  screen,
}: {
  config: TTerminal;
  screen: blessed.Widgets.Screen;
}) {
  /*
        needs 
    */
  const newTerminal = blessed.terminal({
    ...config,
    parent: screen,
    cursor: "block",
    cursorBlink: true,
    screenKeys: false,
    border: "line",
    style: {
      fg: "default",
      bg: "default",
      focus: {
        border: {
          fg: "green",
        },
      },
    },
    alwaysScroll: true,
    scrollable: true,
    // scrollbar: {
    //   style: {
    //     color: "red",
    //   },
    // },
  });

  newTerminal.pty.on("data", function (data: any) {
    screen.log(JSON.stringify(data));
  });

  newTerminal.on("click", newTerminal.focus.bind(newTerminal));
  newTerminal.enableDrag();
  newTerminal.on("title", (title) => {
    screen.title = title;
    newTerminal.setLabel(" " + title + " ");
    screen.render();
  });

  newTerminal.pty.write(`cd ${process.cwd()}\r`);
  newTerminal.pty.write(`${config.command}\r`);

  return newTerminal;
}
