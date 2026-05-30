const express = require('express');
const router = express.Router();
const database = require("../config/database");

router.get("/profiles", (req, res) => {
    database.query("SELECT * FROM github_profiles", (err, results) => {
        if(err) {
            console.error("Error fetching profiles:", err);
            res.status(404).json( {
                "success": false,
                "message": "Failed to fetch profiles"
            })
        } else {
            res.json({
                "success": true,
                "count": results.length,
                "profiles": results
            });
        };
    });
});

router.get("/profiles/:username", (req, res) => {
    const {username} = req.params;
    database.query("SELECT * FROM github_profiles WHERE username = ?", [username], (err, results) => {
        if(err) {
            console.error("Error fetching profile:", err);
            res.status(500).json( {
                "success": false,
                "message": "failed to fetch profile"
            });
        } 
        else if(results.length === 0) {
            res.status(404).json({
                "success": false,
                "message": "Profile not found"
            });
        }
        else {
            res.json({
                "success": true,
                "profile": results[0]
            });
        }
    });
});

module.exports = router;