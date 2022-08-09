const metaData = require('../metadata.js')
const AssetCache = require("@11ty/eleventy-cache-assets");

async function fetchGatorTextCta() {
    urlToCache = metaData.apiUrl + '/global_sections?_fields=id,acf&slug=gator-text-cta';
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

async function processGatorTextCta(gatorTextCta) {
    return await {
        id: gatorTextCta[0].id,
        title: gatorTextCta[0].acf.title,
        paragraph: gatorTextCta[0].acf.paragraph,
        button: gatorTextCta[0].acf.button
    };
}

module.exports = async () => {
    const gatorTextCta = await fetchGatorTextCta();
    const processedGatorTextCta = await processGatorTextCta(gatorTextCta);
    return processedGatorTextCta;
};