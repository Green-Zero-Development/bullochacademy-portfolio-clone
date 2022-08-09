const metaData = require('./metadata.js')
const fetch = require("node-fetch");

var sportsArray = [];

async function fetchSports() {
  baseUrl = metaData.apiUrl + '/sports?',
  restFields = '&_fields=id,title,slug,modified,content,yoast_head,template,acf&';
  try {
    const response = await Promise.all([
        fetch(baseUrl + 'page=1' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=2' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=3' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=4' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=5' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=6' + restFields).then((response) => response.json()),
    ]);
    sportsArray = [].concat(...response)
    return sportsArray;
  } catch (error) {
    console.log(error);
  }
};

async function processSports(sports) {
    return Promise.all(
        sports.map(async (sport) => {
            if (sport.code !== "rest_post_invalid_page_number" && sport.acf.hero_image.url) {
                return await {
                    id: sport.id,
                    title: sport.title.rendered,
                    slug: sport.slug,
                    modified: sport.modified,
                    yoast: sport.yoast_head,
                    template: sport.template,
                    heroTitle: sport.acf.hero_title,
                    heroFilledButton: sport.acf.hero_filled_button,
                    heroOutlineButton: sport.acf.hero_outline_button,
                    heroImg: sport.acf.hero_image.url,
                    heroImgAlt: sport.acf.hero_image.alt,
                    underHeroContentSwitch: sport.acf.add_content_under_the_image,
                    underHeroContent: sport.acf.under_image_content,
                    listingPageImg: sport.acf.listing_image,
                    excerpt: sport.acf.excerpt,
                    sportSeasons: sport.acf.season,
                    pageContent: sport.content
                };
            } else if (sport.code !== "rest_post_invalid_page_number") {
                return await {
                    id: sport.id,
                    title: sport.title.rendered,
                    slug: sport.slug,
                    modified: sport.modified,
                    yoast: sport.yoast_head,
                    template: sport.template,
                    heroTitle: sport.acf.hero_title,
                    heroFilledButton: sport.acf.hero_filled_button,
                    heroOutlineButton: sport.acf.hero_outline_button,
                    heroImg: 'https://inside.bullochacademy.com/wp-content/uploads/2021/09/cross-country.jpg',
                    heroImgAlt: 'learn more about our school sports by clicking on this image.',
                    underHeroContentSwitch: sport.acf.add_content_under_the_image,
                    underHeroContent: sport.acf.under_image_content,
                    listingPageImg: sport.acf.listing_image,
                    excerpt: sport.acf.excerpt,
                    sportSeasons: sport.acf.season,
                    pageContent: sport.content
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
    const sports = await fetchSports();
    const processedSports = await processSports(sports);
    return processedSports;
};