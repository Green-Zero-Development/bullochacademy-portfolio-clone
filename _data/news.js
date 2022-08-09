const metaData = require('./metadata.js')
const fetch = require("node-fetch");

var newsArray = [];

async function fetchNews() {
  baseUrl = metaData.apiUrl + '/news?',
  restFields = '&_fields=id,title,slug,modified,yoast_head,template,date,formatted_date,next,previous,acf&';
  try {
    const response = await Promise.all([
        fetch(baseUrl + 'page=1' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=2' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=3' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=4' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=5' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=6' + restFields).then((response) => response.json()),
    ]);
    newsArray = [].concat(...response)
    return newsArray;
  } catch (error) {
    console.log(error);
  }
};

async function processNews(news) {
    return Promise.all(
        news.map(async (newsItem) => {
            if (newsItem.code !== "rest_post_invalid_page_number" && newsItem.acf.image.url) {
                return await {
                    id: newsItem.id,
                    title: newsItem.acf.title,
                    slug: newsItem.slug,
                    modified: newsItem.modified,
                    yoast: newsItem.yoast_head,
                    template: newsItem.template,
                    date: newsItem.date,
                    formatedDate: newsItem.formatted_date,
                    excerpt: newsItem.acf.excerpt,
                    featImg: newsItem.acf.image.url,
                    featImgAlt: newsItem.acf.image.alt,
                    next: newsItem.next.slug,
                    prev: newsItem.previous.slug,
                    content: newsItem.acf.post_content
                };
            } else if (newsItem.code !== "rest_post_invalid_page_number") {
                return await {
                    id: newsItem.id,
                    title: newsItem.acf.title,
                    slug: newsItem.slug,
                    modified: newsItem.modified,
                    yoast: newsItem.yoast_head,
                    template: newsItem.template,
                    date: newsItem.date,
                    formatedDate: newsItem.formatted_date,
                    excerpt: newsItem.acf.excerpt,
                    featImg: 'https://inside.bullochacademy.com/wp-content/uploads/2021/09/news-example.jpg',
                    featImgAlt: 'learn more about our school by reading our school news',
                    next: newsItem.next.slug,
                    prev: newsItem.previous.slug,
                    content: newsItem.acf.post_content
                };
            } else {
                return await {
                    slug: Math.random(),
                    disabled: 'Yes'
                };
            }
        })
    );
}

module.exports = async () => {
    const news = await fetchNews();
    const processedNews = await processNews(news);
    return processedNews;
};