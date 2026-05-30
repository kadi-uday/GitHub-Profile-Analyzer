const express = require('express');
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const database = require("./config/database");

const healthRoutes = require("./routes/healthRoutes");
const analyzeRoutes = require("./routes/analyzeRoutes");
const profilesRoutes = require("./routes/profilesRoutes");

const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use("/", healthRoutes);
app.use("/", analyzeRoutes);
app.use("/", profilesRoutes);

database.connect((err) => {
    if(err) {
        console.error("Error connecting to the database:", err);
        process.exit(1);
    }

    console.log("Connected to the database successfully!");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});