const metaData = require('./metadata.js')
const fetch = require("node-fetch");

var careersArray = [];

async function fetchCareers() {
  baseUrl = metaData.apiUrl + '/careers?',
  restFields = '&_fields=id,title,slug,yoast_head,template,acf&';
  try {
    const response = await Promise.all([
        fetch(baseUrl + 'page=1' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=2' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=3' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=4' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=5' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=6' + restFields).then((response) => response.json()),
    ]);
    careersArray = [].concat(...response)
    return careersArray;
  } catch (error) {
    console.log(error);
  }
};

async function processCareers(careers) {
    return Promise.all(
        careers.map(async (career) => {
            if (career.code !== "rest_post_invalid_page_number") {
                return await {
                    id: career.id,
                    title: career.title.rendered,
                    slug: career.slug,
                    yoast: career.yoast_head,
                    template: career.template,
                    jobTitle: career.acf.job_title,
                    gradeLevel: career.acf.grade_level,
                    details: career.acf.details
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
    const careers = await fetchCareers();
    const processedCareers = await processCareers(careers);
    return processedCareers;
};