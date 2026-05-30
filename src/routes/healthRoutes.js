const express = require("express");
const router = express.Router();

router.get("/",(req, res) => {
    res.send("Hello World from the server!");
});

router.get("/health", (req, res) => {
    res.json({
  "success": true,
  "message": "Server is healthy",
  "uptime": process.uptime()
});
});

module.exports = router;