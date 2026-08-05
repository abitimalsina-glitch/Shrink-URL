import express from "express";
import cors from "cors";
import router from "./routes/urlRoutes.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/url", router);