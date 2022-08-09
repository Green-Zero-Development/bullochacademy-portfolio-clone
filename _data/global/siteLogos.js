const metaData = require('../metadata.js')
const AssetCache = require("@11ty/eleventy-cache-assets");

async function fetchLogos() {
    urlToCache = metaData.apiUrl + '/site-data?_fields=acf&slug=logos';
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
    const logos = await fetchLogos();
    const siteLogos = await logos;
    return siteLogos;
};