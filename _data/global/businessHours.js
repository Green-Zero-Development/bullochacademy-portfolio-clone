const metaData = require('../metadata.js')
const AssetCache = require("@11ty/eleventy-cache-assets");

async function fetchBusinessHours() {
    urlToCache = metaData.apiUrl + '/site-data?_fields=acf&slug=business-hours';
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

module.exports = async () => {
    const siteBusinessHoursFetch = await fetchBusinessHours();
    const siteBusinessHours = await siteBusinessHoursFetch;
    return siteBusinessHours;
};