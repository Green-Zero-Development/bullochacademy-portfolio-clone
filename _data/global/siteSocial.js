const metaData = require('../metadata.js')
const AssetCache = require("@11ty/eleventy-cache-assets");

async function fetchSiteSocial() {
    urlToCache = metaData.apiUrl + '/site-data?_fields=acf&slug=social-media-links';
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
    const siteSocialFetch = await fetchSiteSocial();
    const siteSocial = await siteSocialFetch;
    return siteSocial;
};