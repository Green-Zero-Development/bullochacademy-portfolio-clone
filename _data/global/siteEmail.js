const metaData = require('../metadata.js')
const AssetCache = require("@11ty/eleventy-cache-assets");

async function fetchSiteEmail() {
    urlToCache = metaData.apiUrl + '/site-data?_fields=acf&slug=emails';
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
    const siteEmailFetch = await fetchSiteEmail();
    const siteEmail = await siteEmailFetch;
    return siteEmail;
};