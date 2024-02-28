import "./env.js"
import express from 'express';
import bodyParser from 'body-parser';
import connectToDatabase from "./db.js";
import swagger from "swagger-ui-express";
import apiDocs from "./swagger.json" assert {type:'json'};
import cors from 'cors'; 

// Initialize Express server
const server = express();
const port = 3002;

// Middleware to parse JSON request bodies
server.use(bodyParser.json());
// Enable CORS
server.use(cors());

// Serve Swagger documentation using Swagger UI
server.use("/api-docs", 
swagger.serve, 
swagger.setup(apiDocs));

// Connect to the database
const db = connectToDatabase();

// API endpoint to display current week leaderboard
server.get('/leaderboard/current-week', (req, res) => {
    // Calculate the date range for the current week
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0); // Set time to the start of the day
    startDate.setDate(startDate.getDate() - startDate.getDay()); // Set date to Sunday (start of the week)

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 7); // Set date to next Sunday

    // Query the database for top scores within the current week
    const query = `
        SELECT UID, Name, Score, Country, TimeStamp 
        FROM leaderboard 
        WHERE TimeStamp >= ? AND TimeStamp < ?
        ORDER BY Score DESC 
        LIMIT 200
    `;

    db.query(query, [startDate, endDate], (err, results) => {
        if (err) {
            console.error('Error retrieving current week leaderboard:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

// API endpoint to display last week leaderboard by country
server.get('/leaderboard/last-week/:country', (req, res) => {
    const country = req.params.country.toUpperCase(); // Convert country code to uppercase

    // Calculate the date range for the last week
    const endDate = new Date();
    endDate.setHours(0, 0, 0, 0); // Set time to the start of the day
    endDate.setDate(endDate.getDate() - endDate.getDay() - 1); // Set date to last Saturday (end of the previous week)

    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 7); // Set date to previous Sunday

    // Query the database for top scores within the last week by country
    const query = `
        SELECT UID, Name, Score, Country, TimeStamp 
        FROM leaderboard 
        WHERE Country = ? AND TimeStamp >= ? AND TimeStamp < ?
        ORDER BY Score DESC 
        LIMIT 200
    `;

    db.query(query, [country, startDate, endDate], (err, results) => {
        if (err) {
            console.error('Error retrieving last week leaderboard by country:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

// API endpoint to fetch user rank by userId
server.get('/user/:userId/rank', (req, res) => {
    const userId = req.params.userId;

    // Query the database to fetch user rank
    const query = `
        SELECT COUNT(*) AS user_rank 
        FROM leaderboard 
        WHERE Score > (SELECT Score FROM leaderboard WHERE UID = ?)
    `;

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching user rank:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        
        // Check if the result is null or undefined
        if (!results[0].user_rank) {
            res.json({ rank: 1 }); // If null, set rank as 1 (top rank)
        } else {
            const rank = results[0].user_rank + 1; // Add 1 to get the actual rank
            res.json({ rank });
        }
    });
});

// Root endpoint
server.get("/", (req, res) => {
    res.send("Welcome to Leaderboard API. Please look at the documentation on how to use the API at https://blacklight-assg.onrender.com/api-docs");
});

// Start the server
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});