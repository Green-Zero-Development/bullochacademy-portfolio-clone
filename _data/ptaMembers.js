const metaData = require('./metadata.js')
const fetch = require("node-fetch");

var ptaMembersArray = [];

async function fetchPtaMembers() {
  baseUrl = metaData.apiUrl + '/pta-members?',
  restFields = '&_fields=id,acf&';
  try {
    const response = await Promise.all([
        fetch(baseUrl + 'page=1' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=2' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=3' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=4' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=5' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=6' + restFields).then((response) => response.json()),
    ]);
    ptaMembersArray = [].concat(...response)
    return ptaMembersArray;
  } catch (error) {
    console.log(error);
  }
};

async function processPtaMembers(ptaMembers) {
    return Promise.all(
        ptaMembers.map(async (ptaMember) => {
            if (ptaMember.code !== "rest_post_invalid_page_number") {
                return await {
                    id: ptaMember.id,
                    name: ptaMember.acf.name,
                    position: ptaMember.acf.position,
                    weight: ptaMember.acf.weight
                };
            } else {
                return await {
                    slug: Math.random(),
                    disabled: 'Yes',
                    weight: Math.random()
                };
            }
        })
    );
}

module.exports = async () => {
    const ptaMembers = await fetchPtaMembers();
    const processedPtaMembers = await processPtaMembers(ptaMembers);
    return processedPtaMembers;
};