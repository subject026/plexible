module.exports = {
  other: {},
  tasks: {
    dev: {
      scripts: [
        {
          label: "server",
          command: "node server/index.js",
          left: 0,
          top: 0,
          width: "50%",
          height: "100%",
        },
        {
          label: "client",
          command: "pnpm serve client",
          left: "50%-1",
          top: 0,
          width: "50%",
          height: "100%",
        },
      ],
    },
  },
  // tasks2: {
  //   dev: {
  //     terminals: [
  //       [
  //         {
  //           label: "server",
  //           command: "ts-node server/index.ts",
  //           left: 0,
  //           top: 0,
  //           width: "50%",
  //           height: "100%",
  //         },
  //         {
  //           label: "client",
  //           command: "pnpm serve client",
  //           left: "50%-1",
  //           top: 0,
  //           width: "50%",
  //           height: "100%",
  //         },
  //       ],
  //       [
  //         {
  //           label: "terminal",
  //           left: 0,
  //           top: "50%-1",
  //           width: "50%",
  //           height: "50%",
  //         },
  //         {
  //           label: "client",
  //           command: "pnpm serve client",
  //           left: "50%-1",
  //           top: 0,
  //           width: "50%",
  //           height: "100%",
  //         },
  //       ],
  //     ],
  //   },
  // },
};
