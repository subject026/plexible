import blessed from "@subject026/blessed";

export function createScreen() {
  return blessed.screen({
    smartCSR: true,
    log:
      process.env.NODE_ENN === "development"
        ? process.cwd() + "/blessed-terminal.log"
        : undefined,
    fullUnicode: true,
    dockBorders: true,
    ignoreDockContrast: true,
  });
}
