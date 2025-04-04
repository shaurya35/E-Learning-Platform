require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // ✅ add this


const app = express();
app.use(express.json());
app.use(cookieParser()); // ✅ use it before your routes


// --- CORS config ---
const allowedOrigins = [
  "http://localhost:3000",
  "http://itersocialconnect.vercel.app",
  "https://itersocialconnect.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.error(`Blocked by CORS: ${origin}`);
      callback(new Error(f`Origin ${origin} not allowed by CORS`));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

const adminRoutes = require("./routes/adminRoutes");
const courseRoutes = require("./routes/courseRoutes");
const studentRoutes = require("./routes/studentRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const notification = require("./routes/notificationRoute");
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notification", notification);


// base route
app.get("/", (req, res) => {
  res.json({ message: "OK" });
});

// routes import


// use routes

// connection and start
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(
      `Connected to DB and running on port http://localhost:${process.env.PORT}/`
    );
  });
});
