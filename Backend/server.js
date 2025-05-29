 const express = require("express");
 const dotenv = require("dotenv");
 const axios = require("axios");
 const cors = require("cors");
 dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// If you have an API key, set it in your .env as BALLEDONTLIE_API_KEY
const API_KEY = process.env.API_KEY || null;

app.get("/", (req, res) => {
    res.send("Hello World");
});



// Get recent NBA games (including playoffs) - last 7 days
app.get("/api/getRecentMatches", async (req, res) => {
    try {
        // Get current date and 7 days ago
        const today = new Date();
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() + 7);

        // Format dates as YYYY-MM-DD
        const endDate = sevenDaysAgo.toISOString().split('T')[0];
        const startDate = today.toISOString().split('T')[0];

        const response = await axios.get(
            `https://api.balldontlie.io/v1/games`,
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`
                },
                params: {
                    start_date: startDate,
                    end_date: endDate,
                    seasons: [2024], // NBA 2024-25 season
                    per_page: 100
                }
            }
        );

        console.log(response.data);
        res.json(response.data);

    } catch (error) {
        console.error("Error fetching recent matches:", error.message);
        res.status(500).json({ error: "Failed to fetch recent matches from Balldontlie." });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

