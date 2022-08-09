const metaData = require('./metadata.js')
const fetch = require("node-fetch");

var eventArray = [];
var eventArrayProcessed = [];

async function fetchEvents() {
  baseUrl = metaData.eventApi + '/events?',
  restFields = '&_fields=events&per_page=50&';
  try {
    const response = await Promise.all([
        fetch(baseUrl + 'page=1' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=2' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=3' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=4' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=5' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=6' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=7' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=8' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=9' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=10' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=11' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=12' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=13' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=14' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=15' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=16' + restFields).then((response) => response.json())
    ]);
    eventArray = [].concat(...response)
    return eventArray;
  } catch (error) {
    console.log(error);
  }
};

async function splitEvents(events) {
    return Promise.all(
        events.map(async (event) => {
            if (event.code !== "event-archive-page-not-found") {
            event.events.forEach(async function(eventSingle) {
                eventArrayProcessed.push(eventSingle)
            });
            return await {
                eventArrayProcessed
            };
            } else {
                return await {
                    slug: Math.random(),
                    disabled: 'Yes'
                };
            }
        })
    );
}

async function processEvents(eventsSplit) {
    return Promise.all(
        eventsSplit[0].eventArrayProcessed.map(async (eventSplit) => {
            return await {
                id: eventSplit.id,
                slug: eventSplit.slug,
                title: eventSplit.title,
                startDate: eventSplit.start_date_details,
                endDate: eventSplit.end_date_details,
                categories: eventSplit.categories
            };
        })
    );
}

module.exports = async () => {
    const events = await fetchEvents();
    const eventsSplit = await splitEvents(events);
    const processedEvents = await processEvents(eventsSplit);
    return processedEvents;
};