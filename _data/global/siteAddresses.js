const metaData = require('../metadata.js')
const AssetCache = require("@11ty/eleventy-cache-assets");

async function fetchSiteAddresses() {
    urlToCache = metaData.apiUrl + '/site-data?_fields=acf&slug=physical-addresses';
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
    const siteAddressesFetch = await fetchSiteAddresses();
    const siteAddresses = await siteAddressesFetch;
    return siteAddresses;
};