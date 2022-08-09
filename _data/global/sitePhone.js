const metaData = require('../metadata.js')
const AssetCache = require("@11ty/eleventy-cache-assets");

async function fetchSitePhone() {
    urlToCache = metaData.apiUrl + '/site-data?_fields=acf&slug=contact-numbers';
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
    const sitePhoneFetch = await fetchSitePhone();
    const sitePhone = await sitePhoneFetch;
    return sitePhone;
};