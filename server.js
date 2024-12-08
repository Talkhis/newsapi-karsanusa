// Install dependencies: express, node-fetch
// Run: npm install express node-fetch
const express = require('express');
const app = express();
const PORT = 3000;
require('@dotenvx/dotenvx').config()

app.set('view engine', 'ejs'); // Use EJS as template engine
app.use(express.static('public')); // Serve static files like CSS

// Route to fetch and display API data
app.get('/', async (req, res) => {
    const { default: fetch } = await import('node-fetch'); // Dynamic import for node-fetch
    const apiUrl = `https://www.searchapi.io/api/v1/search?api_key=${process.env.APP_KEY}&engine=google_news&location=Indonesia&q=art+Batik`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log('API Response:', data); // Debug log
        const articles = data.organic_results || [];
        console.log(articles);
        res.json (articles);
    } catch (error) {
        console.error('Error fetching API:', error);
        res.send('Error fetching data from API.');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
