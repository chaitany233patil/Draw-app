import express from "express";
import mainRoute from "./routes/mainRoute";
import cors from "cors";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", mainRoute);

app.listen(PORT, () => {
  console.log("server listning on port ", PORT);
});
