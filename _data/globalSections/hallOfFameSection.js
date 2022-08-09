const metaData = require('../metadata.js')
const AssetCache = require("@11ty/eleventy-cache-assets");

async function fetchHallOfFameSection() {
    urlToCache = metaData.apiUrl + '/global_sections?_fields=id,acf&slug=hall-of-fame-section';
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

async function processHallOfFameSection(hallOfFameSection) {
    return await {
        id: hallOfFameSection[0].id,
        title: hallOfFameSection[0].acf.title,
        paragraph: hallOfFameSection[0].acf.paragraph
    };
}

module.exports = async () => {
    const hallOfFameSection = await fetchHallOfFameSection();
    const processedHallOfFameSection = await processHallOfFameSection(hallOfFameSection);
    return processedHallOfFameSection;
};