const metaData = require('../metadata.js')
const AssetCache = require("@11ty/eleventy-cache-assets");

async function fetchMobileMenu() {
    urlToCache = metaData.baseUrl + '/wp-json/wp-api-menus/v2/menu-locations/mobile-menu?_fields=title,url,children&per_page=100';
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
    const mobileMenu = await fetchMobileMenu();
    return mobileMenu;
};