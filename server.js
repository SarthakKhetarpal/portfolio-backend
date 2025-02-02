
// const express = require('express');
// const cors = require('cors');
// const app = express();

// app.use(cors());
// app.use(express.json());

// require("dotenv").config();
// const PORT = process.env.PORT || 5050;

// app.get('/', (req,res) => {
//     res.send("Server is running successfully");
// })

// //API to fetch data from GeeksforGeeks
// app.post('/api/gfgdata', async (req, res) => {
//     try {
//         const response = await fetch("https://www.geeksforgeeks.org/user/sarthakkhetarpal22/");
//         const data = await response.text();
//         console.log(data);
//         res.status(200).json({
//             success: true,
//             message: "Data fetched successfully",
//             response: data
//         })
//     } catch(error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// });

// app.listen(PORT, () => {
//     console.log("Server created, running on Port : " + PORT);
// });


const express = require('express');
const cors = require('cors');
const app = express();
const cheerio = require('cheerio'); // Cheerio for HTML parsing

app.use(cors());
app.use(express.json());

require("dotenv").config();
const PORT = process.env.PORT || 5050;

app.get('/', (req, res) => {
    res.send("Server is running successfully");
});

// API to fetch data from GeeksforGeeks
app.post('/api/gfgdata', async (req, res) => {
    try {
        const response = await fetch("https://www.geeksforgeeks.org/user/sarthakkhetarpal22/");
        const data = await response.text();

        // Load the HTML into cheerio
        const $ = cheerio.load(data);

        // Extract the total_problem_solved value using the updated selector
        const totalProblemSolved = $('.scoreCard_head_left--score__oSi_x').eq(1).text().trim();

        // If the value is still empty, log the HTML for debugging
        if (!totalProblemSolved) {
            console.log("HTML for debugging:", $.html());
        }

        res.status(200).json({
            success: true,
            message: "Data fetched successfully",
            total_problem_solved: totalProblemSolved || "Not found"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log("Server created, running on Port : " + PORT);
});