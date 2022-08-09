const metaData = require('./metadata.js')
const fetch = require("node-fetch");

var hallOfFameYearArray = [];

async function fetchHallOfFameYear() {
  baseUrl = metaData.apiUrl + '/hall_of_fame_year?',
  restFields = '&_fields=id,title,acf&';
  try {
    const response = await Promise.all([
        fetch(baseUrl + 'page=1' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=2' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=3' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=4' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=5' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=6' + restFields).then((response) => response.json()),
    ]);
    hallOfFameYearArray = [].concat(...response)
    return hallOfFameYearArray;
  } catch (error) {
    console.log(error);
  }
};

async function processHallOfFameYear(hallOfFameYear) {
    return Promise.all(
        hallOfFameYear.map(async (hallOfFameYearSingle) => {
            if (hallOfFameYearSingle.code !== "rest_post_invalid_page_number") {
                return await {
                    id: hallOfFameYearSingle.id,
                    title: hallOfFameYearSingle.title.rendered,
                    members: hallOfFameYearSingle.acf.hall_of_famer
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

module.exports = async () => {
    const hallOfFameYear = await fetchHallOfFameYear();
    const processedHallOfFameYear = await processHallOfFameYear(hallOfFameYear);
    return processedHallOfFameYear;
};