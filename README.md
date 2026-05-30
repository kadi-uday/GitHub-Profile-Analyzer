# GitHub Profile Analyzer API

A backend API built with **Node.js**, **Express.js**, and **MySQL** that analyzes GitHub user profiles using the GitHub Public API and stores useful insights in a MySQL database.

---

## Features

* Fetch GitHub public profile data using a username
* Analyze profile information
* Store analysis results in MySQL
* Prevent duplicate profile analysis
* Fetch all analyzed profiles
* Fetch a single analyzed profile
* Health check endpoint
* Proper error handling

---

## Tech Stack

* Node.js
* Express.js
* MySQL
* GitHub REST API
* Axios
* dotenv
* CORS

---

## Project Structure

```text
src
│
├── config
│   └── database.js
│
├── routes
│   ├── analyzeRoutes.js
│   ├── healthRoutes.js
│   └── profilesRoutes.js
│
└── app.js
```

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/kadi-uday/GitHub-Profile-Analyzer.git
cd github-profile-analyzer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=github_analyzer
```

### 4. Create Database

```sql
CREATE DATABASE github_analyzer;
```

Use the provided SQL schema file to create the table.

### 5. Start the Server

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

---

## Database Schema

### Table: github_profiles

| Column                    | Type                                |
| ------------------------- | ----------------------------------- |
| id                        | INT AUTO_INCREMENT PRIMARY KEY      |
| username                  | VARCHAR(255) UNIQUE                 |
| name                      | VARCHAR(255)                        |
| followers                 | INT                                 |
| following                 | INT                                 |
| public_repos              | INT                                 |
| account_age_days          | INT                                 |
| followers_following_ratio | DECIMAL(10,2)                       |
| created_at                | DATETIME                            |
| analyzed_at               | TIMESTAMP DEFAULT CURRENT_TIMESTAMP |

---

## Profile Insights Stored

The application stores the following insights:

* Username
* Name
* Followers Count
* Following Count
* Public Repository Count
* Account Age (Days)
* Followers-to-Following Ratio
* GitHub Account Creation Date
* Analysis Timestamp

---

## API Endpoints

### Health Check

#### Request

```http
GET /health
```

#### Response

```json
{
  "success": true,
  "message": "Server is healthy"
}
```

---

### Analyze GitHub Profile

#### Request

```http
GET /analyze/:username
```

Example:

```http
GET /analyze/kadi-uday
```

#### Success Response

```json
{
  "success": true,
  "profile": {
    "username": "kadi-uday",
    "name": "Kadi Uday",
    "followers": 1,
    "following": 3,
    "public_repos": 7,
    "account_age_days": 487,
    "followers_following_ratio": "0.33"
  }
}
```

#### Duplicate Profile Response

```json
{
  "success": false,
  "message": "Profile already analyzed"
}
```

#### User Not Found Response

```json
{
  "success": false,
  "message": "GitHub user not found"
}
```

---

### Fetch All Analyzed Profiles

#### Request

```http
GET /profiles
```

#### Response

```json
{
  "success": true,
  "count": 3,
  "profiles": []
}
```

---

### Fetch Single Profile

#### Request

```http
GET /profiles/:username
```

Example:

```http
GET /profiles/kadi-uday
```

#### Response

```json
{
  "success": true,
  "profile": {
    "id": 1,
    "username": "kadi-uday"
  }
}
```

#### Profile Not Found

```json
{
  "success": false,
  "message": "Profile not found"
}
```

---

## Error Handling

The API handles:

* Invalid GitHub usernames
* Duplicate profile analysis
* Database errors
* Missing profiles

---

## Future Improvements

* Pagination for profile listing
* Sorting and filtering
* GitHub repository analysis
* GitHub activity insights
* Docker support
* Authentication and authorization

---

## Submission Files

The following files are included with the project submission:

### 1. database_schema.sql

Contains:

* Database creation script
* Table creation script for `github_profiles`
* Complete schema required to run the project

### 2. Github-Profile-Analyzer.postman_collection.json

Contains:

Tested API requests for:

* GET `/`
* GET `/health`
* GET `/analyze/:username`
* GET `/profiles`
* GET `/profiles/:username`

This collection can be imported directly into Postman for API testing.

---

## Deployment

### Live API URL

Paste your deployed API URL here:

```text
https://your-render-app-url.onrender.com
```

---

## GitHub Repository

Paste your GitHub repository URL here:

```text
https://github.com/your-username/github-profile-analyzer
```
---

## Author

Kadi Uday

B.Tech – Artificial Intelligence & Data Science

Frontend & Backend Developer
