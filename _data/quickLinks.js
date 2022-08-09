const metaData = require('./metadata.js')
const AssetCache = require("@11ty/eleventy-cache-assets");

async function fetchQuickLinks() {
    urlToCache = metaData.apiUrl + '/quick_links?_fields=id,acf';
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

async function processQuickLinks(quickLinks) {
    return Promise.all(
        quickLinks.map(async (quickLink) => {
        if (quickLink.acf.type_of_link == 'Links to a page on this site') {
            return await {
                id: quickLink.id,
                text: quickLink.acf.text,
                typeOfLink: quickLink.acf.type_of_link,
                link: quickLink.acf.link,
            };
        } else if (quickLink.acf.type_of_link == 'Links to another site') {
            return await {
                id: quickLink.id,
                text: quickLink.acf.text,
                typeOfLink: quickLink.acf.type_of_link,
                offsiteLink: quickLink.acf.link_offsite,
            };
        } else {
            return await {
                id: quickLink.id,
                text: quickLink.acf.text,
                typeOfLink: quickLink.acf.type_of_link,
                fileLink: quickLink.acf.link_file.url,
            };
        }
}))
}

module.exports = async () => {
    const quickLinks = await fetchQuickLinks();
    const processedQuickLinks = await processQuickLinks(quickLinks);
    return processedQuickLinks;
};