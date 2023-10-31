# Al Jazeera Live Blog Scraper

This Node.js application provides a simple web scraper for extracting live blog updates from Al Jazeera's website. It uses Axios for making HTTP requests and Cheerio for parsing the HTML content.

## Features

- Scrapes live blog updates, including their timestamp, content, and link.
- Converts relative links to absolute URLs for direct access.
- RESTful API endpoint for retrieving live blog updates.

## Installation

1. Clone this repository:

2. Navigate to the project directory:

3. Install dependencies:

## Usage

1. Start the server:

2. Access the live blog updates via the API endpoint:

## Sample Response

```json
[
{
 "time": "منذ 44 دقائق",
 "link": "https://www.aljazeera.net/news/liveblog/2023/10/31/الحرب-على-غزة-مباشر-أسيرات-إسرائيليات?update=6000481",
 "content": "القسام تقصف قاعدة جوية في النقب"
},
{
 "time": "منذ 53 دقائق",
 "link": "https://www.aljazeera.net/news/liveblog/2023/10/31/الحرب-على-غزة-مباشر-أسيرات-إسرائيليات?update=6000477",
 "content": "قائد بالقسام: تفجير آلية إسرائيلية ومقتل طاقمها شمال غرب غزة"
},
// ... other updates
]
