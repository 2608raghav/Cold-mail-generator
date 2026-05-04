require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const { ChatGroq } = require("@langchain/groq");

const app = express();
app.use(express.json());
app.use(express.static('public'));

const llm = new ChatGroq({
    // Using your provided key from the Python code
    apiKey: process.env.GROQ_API_KEY, 
    model: "llama-3.3-70b-versatile",
    temperature: 0.5
});

app.post('/generate-email', async (req, res) => {
    try {
        const { url } = req.body;
        console.log(`Step 1: Scraping ${url}`);

        // Scrape the website with a real browser header to avoid 403 errors
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            timeout: 30000 
        });

        const $ = cheerio.load(response.data);
        // Extract only the main text, ignoring scripts and styles
        $('script, style, nav, footer').remove();
        const bodyText = $('body').text().replace(/\s\s+/g, ' ').trim().substring(0, 6000);

        if (!bodyText || bodyText.length < 100) {
            throw new Error("Could not extract enough text from the website.");
        }

        console.log("Step 2: Sending to Groq...");

        // Simple, direct prompt for the email
        const aiResponse = await llm.invoke([
            ["system", "You are an expert career coach and cold-email writer."],
            ["user", `I have scraped the following job description text:
            ---
            ${bodyText}
            ---
            Based on this, write a highly professional, short cold email to a hiring manager. 
            Focus on the key skills mentioned. Use a polite tone. 
            Do not include placeholders like [Your Name]—just write a generic but professional signature. 
            Output only the email content.`]
        ]);

        res.json({ email: aiResponse.content });

    } catch (error) {
        console.error("Server Error Detail:", error.message);
        // Send a clean JSON error back so the frontend doesn't crash
        res.status(500).json({ error: error.message || "Something went wrong on the server" });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server live at http://localhost:${PORT}`));