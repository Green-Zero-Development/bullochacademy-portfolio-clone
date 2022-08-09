const metaData = require('./metadata.js')
const AssetCache = require("@11ty/eleventy-cache-assets");

async function fetchSiteData() {
    urlToCache = metaData.baseUrl + '/wp-json?_fields=name,description,home';
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

async function processSiteData(siteDataStream) {
    return await {
        siteName: siteDataStream.name,
        siteMetaDescription: siteDataStream.description,
        siteBaseUrl: siteDataStream.home
    };
}

module.exports = async () => {
    const siteDataStream = await fetchSiteData();
    const processedSiteData = await processSiteData(siteDataStream);
    return processedSiteData;
};