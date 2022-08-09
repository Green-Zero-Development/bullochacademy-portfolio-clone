const metaData = require('./metadata.js')
const fetch = require("node-fetch");

var facultyArray = [];

async function fetchFaculty() {
  baseUrl = metaData.apiUrl + '/faculty_staff?',
  restFields = '&_fields=id,acf&';
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
    ]);
    facultyArray = [].concat(...response)
    return facultyArray;
  } catch (error) {
    console.log(error);
  }
};

async function processFaculty(faculty) {
    return Promise.all(
        faculty.map(async (facultySingle) => {
            if (facultySingle.code !== "rest_post_invalid_page_number") {
                return await {
                    id: facultySingle.id,
                    department: facultySingle.acf.department,
                    name: facultySingle.acf.name,
                    jobTitle: facultySingle.acf.job_title,
                    email: facultySingle.acf.email,
                    bio: facultySingle.acf.bio,
                    headshotImg: facultySingle.acf.headshot.url,
                    headshotAlt: facultySingle.acf.headshot.alt,
                };
            } else {
                return await {
                    disabled: 'Yes'
                };
            }
        })
    );
}

module.exports = async () => {
    const faculty = await fetchFaculty();
    const processedFaculty = await processFaculty(faculty);
    return processedFaculty;
};