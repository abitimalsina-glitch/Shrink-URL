import dotenv from 'dotenv'
import { app } from "./app.js"

dotenv.config();

const PORT = process.env.PORT || 3000;

app.get("/", (res, req) => {
  res.send("The server is running")
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});