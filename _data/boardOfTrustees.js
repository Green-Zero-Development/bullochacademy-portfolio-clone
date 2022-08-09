const metaData = require('./metadata.js')
const fetch = require("node-fetch");

var trusteesBoardArray = [];

async function fetchTrusteesBoard() {
  baseUrl = metaData.apiUrl + '/board_of_trustees?',
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
    trusteesBoardArray = [].concat(...response)
    return trusteesBoardArray;
  } catch (error) {
    console.log(error);
  }
};

async function processTrusteesBoard(trusteesBoard) {
    return Promise.all(
        trusteesBoard.map(async (trusteesBoardSingle) => {
            if (trusteesBoardSingle.code !== "rest_post_invalid_page_number") {
                return await {
                    id: trusteesBoardSingle.id,
                    title: trusteesBoardSingle.title.rendered,
                    members: trusteesBoardSingle.acf
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
    const trusteesBoard = await fetchTrusteesBoard();
    const processedTrusteesBoard = await processTrusteesBoard(trusteesBoard);
    return processedTrusteesBoard;
};