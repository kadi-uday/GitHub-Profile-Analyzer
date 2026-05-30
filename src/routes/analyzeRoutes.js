const express = require("express");
const axios = require('axios');
const database = require("../config/database");
const router = express.Router();

router.get("/analyze/:username", async (req,res) => {
    try{

        const {username} = req.params;

        const githubUrl = `https://api.github.com/users/${username}`;

        const response = await axios.get(githubUrl);
        const userData = response.data;

        const createdDate = new Date(userData.created_at);
        const currentDate = new Date();

        const accountAgeInDays = Math.floor((currentDate - createdDate) / (1000 * 60 * 60 * 24));
        
        console.log(`Account age in days: ${accountAgeInDays}`);

        const followersToFollowingRatio = userData.following === 0 ? 0 : (userData.followers / userData.following).toFixed(2);

        console.log(`Followers to Following Ratio: ${followersToFollowingRatio}`);

        const profile = {
                "username": userData.login,
                "name": userData.name,
                "id": userData.id,
                "avatar_url": userData.avatar_url,
                "url": userData.url,
                "followers": userData.followers,
                "following": userData.following,
                "public_repos": userData.public_repos,
                "created_at": userData.created_at,
                "account_age_days": accountAgeInDays,
                "followers_following_ratio": followersToFollowingRatio,
        }

        const query = "INSERT INTO github_profiles (username, name, followers, following, public_repos, account_age_days, followers_following_ratio, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        const mysqlCreatedAt = userData.created_at.replace("T"," ").replace("Z", "");

        const values = [profile.username, profile.name, profile.followers, profile.following, profile.public_repos, profile.account_age_days, profile.followers_following_ratio, mysqlCreatedAt];

        database.query(query, values, (err, result) => {
            if (err) {

                if(err.code === "ER_DUP_ENTRY") {
                    return res.status(409).json({
                        "success": false,
                        "message": "Profile already analyzed"
                    });
                }
                return res.status(500).json( {
                    "success": false,
                    "message": "Failed to save profile to the database"
                });
            };

            console.log("Profile saved successfully!");
            console.log(result);

            res.status(201).json({
                "success": true,
                "profile": profile
            });
        });

    } catch(error) {

        if(error.response?.status === 404) {

            return res.status(404).json({
                "success": false,
                "message": "GitHub user not found"
            });

        }

        return res.status(500).json({
            "success": false,
            "message": "Something went wrong"
        });
    }   
    
});

module.exports = router;