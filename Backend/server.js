 const express = require("express");
 const dotenv = require("dotenv");
 const axios = require("axios");
 const cors = require("cors");
 dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;


app.get("/", (req, res) => {
    res.send("API for Upcomming FootBall Match [ 7 days ] ");
});



const FOOTBALL_API_KEY = process.env.FOOTBALL_API_KEY


app.get("/api/getUpcomingSoccer", async (req, res) => {
    try {
        
        const today = new Date();
        const addDate = new Date(today);
        addDate.setDate(today.getDate() + 7); 

        
        const dateFrom = today.toISOString().split('T')[0];
        const dateTo = addDate.toISOString().split('T')[0];

        console.log('dates:', { dateFrom, dateTo }); 
        // Call football-data.org endpoint for all matches
        const response = await axios.get(
            `https://api.football-data.org/v4/matches`,  
            {
                headers: {
                     "X-Auth-Token": FOOTBALL_API_KEY ,
                    "Accept": "application/json"
                }, 
                params: {
                    dateFrom: dateFrom,
                    dateTo: dateTo,
                    status: "SCHEDULED",
                   
                }
            }
        );
        console.log(response.data);
        
        // Format the response to match frontend 
        const matches = response.data.matches.map(match => ({
            id: match.id,
            homeTeam: match.homeTeam.name,
            homeTeamShortName:match.homeTeam.shortName,
            awayTeam: match.awayTeam.name,
            awayTeamShortName: match.awayTeam.shortName,
            stage:match.stage,
            date: match.utcDate.split('T')[0],  
            time: match.utcDate.split('T')[1].slice(0, 5),  
            status: match.status,
            league: match.competition.name,  
            leagueLogo: match.competition.emblem  
        }));

        res.send(matches);
    } catch (error) {
        console.error("Error fetching upcoming soccer matches:", error.message);
        res
            .status(500)
            .json({ error: "Failed to fetch upcoming soccer matches from Football-Data." });
    }
});



// // Get recent NBA games (including playoffs) - last 7 days
// app.get("/api/getRecentNBAMatches", async (req, res) => {
//     try {
//         // Get current date and 7 days ago
//         const today = new Date();
//         const sevenDaysAgo = new Date(today);
//         sevenDaysAgo.setDate(today.getDate() + 30);

//         // Format dates as YYYY-MM-DD
//         const endDate = sevenDaysAgo.toISOString().split('T')[0];
//         const startDate = today.toISOString().split('T')[0];

//         const response = await axios.get(
//             `https://api.balldontlie.io/v1/games`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${API_KEY}`
//                 },
//                 params: {
//                     start_date: startDate,
//                     end_date: endDate,
//                     seasons: [2024], // NBA 2024-25 season
//                     per_page: 100
//                 }
//             }
//         );

//         console.log(response.data);
//         res.json(response.data);

//     } catch (error) {
//         console.error("Error fetching recent matches:", error.message);
//         res.status(500).json({ error: "Failed to fetch recent matches from Balldontlie." });
//     }
// });


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

