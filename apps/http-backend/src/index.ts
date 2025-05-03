import express, { Request, Response } from "express";
import mainRoute from "./routes/mainRoute";

const app = express();
app.use(express.json());

app.use("/api/v1", mainRoute);

app.listen(3001, () => {
  console.log("server listning on port 3001");
});
