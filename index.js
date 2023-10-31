const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = 3001;

app.use(express.json());


app.get('/get-liveblog', async (req, res) => {
  try {
    const response = await axios.get('https://www.aljazeera.net/');
    const htmlContent = response.data;

    const $ = cheerio.load(htmlContent);

    // Base URL to prepend to relative links
    const baseUrl = 'https://www.aljazeera.net';

    // Select all <li> elements with the specified class and extract information
    const extractedInfo = [];
    $('li.liveblog-timeline__update').each((index, element) => {
      const info = {
        time: $(element).find('div.liveblog-timeline__update-time').text(),
        link: baseUrl + $(element).find('a.liveblog-timeline__update-link').attr('href'),
        content: $(element).find('h4.liveblog-timeline__update-content').text(),
      };

      extractedInfo.push(info);
    });

    res.json(extractedInfo);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching the content.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
