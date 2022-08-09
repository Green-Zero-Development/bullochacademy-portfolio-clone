const metaData = require('./metadata.js')
const fetch = require("node-fetch");

var alumniYearArray = [];

async function fetchAlumniYear() {
  baseUrl = metaData.apiUrl + '/alumni_roster?',
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
    alumniYearArray = [].concat(...response)
    return alumniYearArray;
  } catch (error) {
    console.log(error);
  }
};

async function processAlumniYear(alumniYear) {
    return Promise.all(
        alumniYear.map(async (alumniYearSingle) => {
            if (alumniYearSingle.code !== "rest_post_invalid_page_number") {
                return await {
                    id: alumniYearSingle.id,
                    title: alumniYearSingle.title.rendered,
                    alumnus: alumniYearSingle.acf.alumnus
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
    const alumniYear = await fetchAlumniYear();
    const processedAlumniYear = await processAlumniYear(alumniYear);
    return processedAlumniYear;
};