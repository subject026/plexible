import express from "express";

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.json({ this: "nice server" });
});

app.listen(9876, () => {
  console.log(`[server]: Server is running at http://localhost:9876`);
});
