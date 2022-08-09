const metaData = require('./metadata.js')
const AssetCache = require("@11ty/eleventy-cache-assets");

async function fetchFourOFour() {
    urlToCache = metaData.apiUrl + '/pages?_fields=id,title,slug,yoast_head,template,acf&slug=404-2';
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

async function processFourOFour(fourOFour) {
    return await {
        id: fourOFour[0].id,
        title: '404',
        slug: fourOFour[0].slug,
        yoast: fourOFour[0].yoast_head,
        template: fourOFour[0].template,
        heroTitle: fourOFour[0].acf.hero_section.title,
        heroParagraph: fourOFour[0].acf.hero_section.paragraph,
        heroButtonText: fourOFour[0].acf.hero_section.button.text,
        heroButtonLink: fourOFour[0].acf.hero_section.button.link
    };
}

module.exports = async () => {
    const fourOFour = await fetchFourOFour();
    const processedFourOFour = await processFourOFour(fourOFour);
    return processedFourOFour;
};