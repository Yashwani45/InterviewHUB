import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import authRouter from "./route/authRouter.js";
import userRouter from "./route/userRoute.js";
import interviewRouter from "./route/interviewRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();


const allowedOrigins = [
  "http://localhost:5173",
  "https://interview-hub-t85e.vercel.app"  ,
  "https://interview-hub-t85e-git-main-yashwani-kushwaha-s-projects.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());


// Home Route
app.get("/", (req, res) => {
  res.send("Backend is Running 🚀");
});


app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/interview", interviewRouter);


app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});