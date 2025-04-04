require("dotenv").config();
const express = require("express");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();
app.use(express.json());

app.use("/api", uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
