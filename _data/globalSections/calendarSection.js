const metaData = require('../metadata.js')
const AssetCache = require("@11ty/eleventy-cache-assets");

async function fetchCalendarSection() {
    urlToCache = metaData.apiUrl + '/global_sections?_fields=id,acf&slug=calendar-section';
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

async function processCalendarSection(calendarSection) {
    return await {
        id: calendarSection[0].id,
        title: calendarSection[0].acf.title,
        buttonText: calendarSection[0].acf.button.text,
        buttonDestination: calendarSection[0].acf.button.link_to_where,
        offsiteLink: calendarSection[0].acf.button.link_offsite,
        link: calendarSection[0].acf.button.link,
    };
}

module.exports = async () => {
    const calendarSection = await fetchCalendarSection();
    const processedCalendarSection = await processCalendarSection(calendarSection);
    return processedCalendarSection;
};