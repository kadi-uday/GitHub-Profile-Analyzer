CREATE DATABASE IF NOT EXISTS github_analyzer;

USE github_analyzer;

CREATE TABLE github_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    followers INT DEFAULT 0,
    following INT DEFAULT 0,
    public_repos INT DEFAULT 0,
    account_age_days INT,
    followers_following_ratio DECIMAL(10,2),
    created_at DATETIME,
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);