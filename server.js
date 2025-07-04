const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

const scrapeArticles = async () => {
  const articles = [];
  const sources = ['https://srf.ch', 'https://nzz.ch', 'https://beobachter.ch', 'https://blick.ch'];

  for (const source of sources) {
    const { data } = await axios.get(source);
    const $ = cheerio.load(data);
    const articleCount = $('article').length; // Simplified count
    articles.push({ source, count: articleCount });
  }

  return articles;
};

app.get('/api/articles', async (req, res) => {
  const articles = await scrapeArticles();
  res.json(articles);
});

// Serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
