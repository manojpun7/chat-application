import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";


const PORT = process.env.PORT || 5000;
const __dirname = path.resolve(); // this is for deployment purpose

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://chat-application-frontend-iljs.onrender.com"
];

app.use(
  cors({
    origin: allowedOrigins, // allow all listed origins
  })
);
app.use(express.json());
app.use(cookieParser()); 

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist"))); // this is for deployment purpose
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html")); // this is for deployment purpose
}); 
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server is running on port ${PORT}`);
});
