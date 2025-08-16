import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import path from "path";

dotenv.config();

const app = express();
const port = process.env.PORT;
const __dirname = path.resolve();

//middleware
if(process.env.NODE_ENV === "production") {
  app.use(cors({
    origin: "http://localhost:5173",
  }));
}
app.use(express.json());
app.use(rateLimiter);


app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
}

connectDB().then(() => {
  app.listen(port, () => {
    console.log("server started", port);
  });
});
