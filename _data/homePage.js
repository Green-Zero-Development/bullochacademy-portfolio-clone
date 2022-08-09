const metaData = require('./metadata.js')
const AssetCache = require("@11ty/eleventy-cache-assets");

async function fetchHomePage() {
    urlToCache = metaData.apiUrl + '/pages?_fields=id,title,slug,link,modified,yoast_head,template,acf&slug=home-page';
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

async function processHomePage(homePage) {
    return await {
        id: homePage[0].id,
        title: homePage[0].title.rendered,
        slug: homePage[0].slug,
        link: homePage[0].link,
        modified: homePage[0].modified,
        yoast: homePage[0].yoast_head,
        template: homePage[0].template,
        heroImg: homePage[0].acf.hero_section.image.url,
        heroImgAlt: homePage[0].acf.hero_section.image.alt,
        heroTitle: homePage[0].acf.hero_section.title,
        heroParagraph: homePage[0].acf.hero_section.paragraph,
        heroFilledButtonText: homePage[0].acf.hero_section.filled_button.text,
        heroFilledButtonLinkDestination: homePage[0].acf.hero_section.filled_button.link_to_where,
        heroFilledButtonLinkOnSite: homePage[0].acf.hero_section.filled_button.link,
        heroFilledButtonLinkOffSite: homePage[0].acf.hero_section.filled_button.link_offsite,
        heroOutlineButtonText: homePage[0].acf.hero_section.outline_button.text,
        heroOutlineButtonLinkDestination: homePage[0].acf.hero_section.outline_button.link_to_where,
        heroOutlineButtonLinkOnSite: homePage[0].acf.hero_section.outline_button.link,
        heroOutlineButtonLinkOffSite: homePage[0].acf.hero_section.outline_button.link_offsite,
        afterHeroImg: homePage[0].acf.after_hero_link_section.image.url,
        afterHeroImgAlt: homePage[0].acf.after_hero_link_section.image.alt,
        afterHeroLinks: homePage[0].acf.after_hero_link_section.link,
        gatorCtaTitle: homePage[0].acf.gator_cta.title,
        gatorCtaParagraph: homePage[0].acf.gator_cta.paragraph,
        gatorCtaButtonText: homePage[0].acf.gator_cta.button.text,
        gatorCtaButtonLinkDestination: homePage[0].acf.gator_cta.button.link_to_where,
        gatorCtaButtonLinkOnSite: homePage[0].acf.gator_cta.button.link,
        gatorCtaButtonLinkOffSite: homePage[0].acf.gator_cta.button.link_offsite,
        gatorCtaVideoLink: homePage[0].acf.gator_cta.youtube_share_link,
    };
}

module.exports = async () => {
    const homePage = await fetchHomePage();
    const processedHomePage = await processHomePage(homePage);
    return processedHomePage;
};