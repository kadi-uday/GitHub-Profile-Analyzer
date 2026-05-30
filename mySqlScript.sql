CREATE DATABASE github_analyzer;

USE github_analyzer;

CREATE TABLE github_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    followers INT,
    following INT,
    public_repos INT,
    account_age_days INT,
    followers_following_ratio DECIMAL(10,2),
    created_at DATETIME,
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM github_profiles;