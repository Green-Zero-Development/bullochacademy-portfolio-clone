const metaData = require('../metadata.js')
const AssetCache = require("@11ty/eleventy-cache-assets");

async function fetchPreFooterCta() {
    urlToCache = metaData.apiUrl + '/global_sections?_fields=id,acf&slug=pre-footer-cta';
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

async function processPreFooterCta(preFooterCta) {
    return await {
        id: preFooterCta[0].id,
        title: preFooterCta[0].acf.title,
        icons: preFooterCta[0].acf.icon
    };
}

module.exports = async () => {
    const preFooterCta = await fetchPreFooterCta();
    const processedPreFooterCta = await processPreFooterCta(preFooterCta);
    return processedPreFooterCta;
};