import express from 'express'
import router from "./routes/urlRoutes.js";

export const app = express();

app.use(express.json());
app.use("/api/url", router);