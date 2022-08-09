const metaData = require('../metadata.js')
const AssetCache = require("@11ty/eleventy-cache-assets");

async function fetchTrackingCode() {
    urlToCache = metaData.apiUrl + '/site-data?_fields=acf&slug=tracking-code';
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
    const getTrackingCode = await fetchTrackingCode();
    const siteTrackingCode = await getTrackingCode;
    return siteTrackingCode;
};