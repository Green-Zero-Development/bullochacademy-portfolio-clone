const metaData = require('../metadata.js')
const AssetCache = require("@11ty/eleventy-cache-assets");

async function fetchNewsSection() {
    urlToCache = metaData.apiUrl + '/global_sections?_fields=id,acf&slug=news-section';
    cacheInterval = metaData.cacheInterval;
    try {
        return AssetCache(
            urlToCache,
            {
                duration: cacheInterval,
                type: "json"
            }
        );
    } catch (error) {
        console.error(`Error: ${error}`);
        return [];
    }
}

async function processNewsSection(newsSection) {
    return await {
        id: newsSection[0].id,
        title: newsSection[0].acf.title,
        buttonText: newsSection[0].acf.button.text,
        buttonDestination: newsSection[0].acf.button.link_to_where,
        offsiteLink: newsSection[0].acf.button.link_offsite,
        link: newsSection[0].acf.button.link,
    };
}

module.exports = async () => {
    const newsSection = await fetchNewsSection();
    const processedNewsSection = await processNewsSection(newsSection);
    return processedNewsSection;
};