const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.get("/get-liveblog", async (req, res) => {
  try {
    const response = await axios.get("https://www.aljazeera.net");
    const htmlContent = response.data;

    const $ = cheerio.load(htmlContent);

    // Extract the "title" and "link" from the specified HTML element
    const title = $(".fte-article__title h3 a span").text();
    const link =
      "https://www.aljazeera.net" + $(".fte-article__title-link").attr("href");

    // Create the "headline" object
    const headline = {
      title: title,
      link: link,
    };
    const news = [];
    $("ul.fte-featured li.fte-featured-articles-list__item").each(
      (index, element) => {
        const articleLink =
          "https://www.aljazeera.net" +
          $(element).find("a.u-clickable-card__link").attr("href");
        const articleTitle = $(element).find("a.u-clickable-card__link").text();

        news.push({
          link: articleLink,
          title: articleTitle,
        });
      }
    );
    // Select all <li> elements with the specified class and extract information
    const extractedInfo = [];
    $("li.liveblog-timeline__update").each((index, element) => {
      const info = {
        time: $(element).find("div.liveblog-timeline__update-time").text(),
        link:
          "https://www.aljazeera.net" +
          $(element).find("a.liveblog-timeline__update-link").attr("href"),
        content: $(element).find("h4.liveblog-timeline__update-content").text(),
      };

      extractedInfo.push(info);
    });

    // Create the response object with "headline" and "blogs"
    const responseObj = {
      headline: headline,
      blogs: extractedInfo,
      news: news,
    };

    res.json(responseObj);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching the content.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
