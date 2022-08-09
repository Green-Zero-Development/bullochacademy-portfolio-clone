const metaData = require('./metadata.js')
const fetch = require("node-fetch");

var pageArray = [];

async function fetchPages() {
  baseUrl = metaData.apiUrl + '/pages?',
  restFields = '&_fields=id,title,modified,slug,link,parent_title,content,parent_slug,children_pages,yoast_head,template,acf&per_page=100&exclude=15,94&';
  try {
    const response = await Promise.all([
        fetch(baseUrl + 'page=1' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=2' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=3' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=4' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=5' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=6' + restFields).then((response) => response.json()),
    ]);
    pageArray = [].concat(...response)
    return pageArray;
  } catch (error) {
    console.log(error);
  }
};

async function processPages(wpages) {
    return Promise.all(
        wpages.map(async (wpage) => {
            if (wpage.template == "templates/thank-you.php") {
                return await {
                    id: wpage.id,
                    title: wpage.title.rendered,
                    slug: wpage.slug,
                    link: wpage.link,
                    yoast: wpage.yoast_head,
                    template: wpage.template,
                    heroTitle: wpage.acf.hero_section.title,
                    heroParagraph: wpage.acf.hero_section.paragraph,
                    heroButtonText: wpage.acf.hero_section.button.text,
                    heroButtonLink: wpage.acf.hero_section.button.link
                };
            } else if (wpage.template == "templates/admissions.php" || wpage.template == "templates/academics.php" || wpage.template == "templates/athletics.php" || wpage.template == "templates/careers-list.php" || wpage.template == "templates/alumni.php" || wpage.template == "templates/school-news-calendar.php" || wpage.template == "templates/master-athletics-calendar.php" || wpage.template == "templates/faculty-and-staff.php") {
                return await {
                    id: wpage.id,
                    title: wpage.title.rendered,
                    slug: wpage.slug,
                    modified: wpage.modified,
                    link: wpage.link,
                    yoast: wpage.yoast_head,
                    template: wpage.template,
                    parentPageTitle: wpage.parent_title,
                    parentPageSlug: wpage.parent_slug,
                    childrenPages: wpage.children_pages,
                    heroTitle: wpage.acf.hero_title,
                    heroFilledButton: wpage.acf.hero_filled_button,
                    heroOutlineButton: wpage.acf.hero_outline_button,
                    heroImg: wpage.acf.hero_image.url,
                    heroImgAlt: wpage.acf.hero_image.alt,
                    underHeroContentSwitch: wpage.acf.add_content_under_the_image,
                    underHeroTitle: wpage.acf.under_image_content.title,
                    underHeroParagraph: wpage.acf.under_image_content.paragraph,
                    underHeroButton: wpage.acf.under_image_content.button,
                    underHeroFigures: wpage.acf.under_image_content.figures
                };
            } else if (wpage.template == "templates/about.php") {
                return await {
                    id: wpage.id,
                    title: wpage.title.rendered,
                    slug: wpage.slug,
                    modified: wpage.modified,
                    link: wpage.link,
                    yoast: wpage.yoast_head,
                    template: wpage.template,
                    parentPageTitle: wpage.parent_title,
                    parentPageSlug: wpage.parent_slug,
                    childrenPages: wpage.children_pages,
                    heroTitle: wpage.acf.hero_title,
                    heroFilledButton: wpage.acf.hero_filled_button,
                    heroOutlineButton: wpage.acf.hero_outline_button,
                    heroImg: wpage.acf.hero_image.url,
                    heroImgAlt: wpage.acf.hero_image.alt,
                    underHeroContentSwitch: wpage.acf.add_content_under_the_image,
                    underHeroTitle: wpage.acf.under_image_content.title,
                    underHeroParagraph: wpage.acf.under_image_content.paragraph,
                    underHeroButton: wpage.acf.under_image_content.button,
                    underHeroFigures: wpage.acf.under_image_content.figures,
                    imageSection: wpage.acf.image_section,
                    reverseImageSection: wpage.acf.reverse_image_section,
                    gatorTextSection: wpage.acf.gator_text_section,
                    greenCta: wpage.acf.green_cta
                };
            } else if (wpage.template == "templates/contact.php") {
                return await {
                    id: wpage.id,
                    title: wpage.title.rendered,
                    slug: wpage.slug,
                    modified: wpage.modified,
                    link: wpage.link,
                    yoast: wpage.yoast_head,
                    template: wpage.template,
                    heroTitle: wpage.acf.hero_title,
                    heroFilledButton: wpage.acf.hero_filled_button,
                    heroOutlineButton: wpage.acf.hero_outline_button,
                    heroImg: wpage.acf.hero_image.url,
                    heroImgAlt: wpage.acf.hero_image.alt,
                    underHeroContentSwitch: wpage.acf.add_content_under_the_image,
                    underHeroTitle: wpage.acf.under_image_content.title,
                    formsList: wpage.acf.forms_list
                };
            } else if (wpage.template == "templates/schedule-tour.php") {
                return await {
                    id: wpage.id,
                    title: wpage.title.rendered,
                    slug: wpage.slug,
                    modified: wpage.modified,
                    link: wpage.link,
                    yoast: wpage.yoast_head,
                    template: wpage.template,
                    heroTitle: wpage.acf.hero_title,
                    heroFilledButton: wpage.acf.hero_filled_button,
                    heroOutlineButton: wpage.acf.hero_outline_button,
                    heroImg: wpage.acf.hero_image.url,
                    heroImgAlt: wpage.acf.hero_image.alt,
                    underHeroContentSwitch: wpage.acf.add_content_under_the_image,
                    underHeroTitle: wpage.acf.under_image_content.title,
                    underHeroParagraph: wpage.acf.under_image_content.paragraph,
                };
            } else if (wpage.code !== "rest_post_invalid_page_number" && wpage.template == "templates/contact-us.php") {
                return await {
                    id: wpage.id,
                    title: wpage.title.rendered,
                    slug: wpage.slug,
                    modified: wpage.modified,
                    link: wpage.link,
                    yoast: wpage.yoast_head,
                    template: wpage.template,
                };
            } else if (wpage.template == "templates/parents.php") {
                return await {
                    id: wpage.id,
                    title: wpage.title.rendered,
                    slug: wpage.slug,
                    modified: wpage.modified,
                    link: wpage.link,
                    yoast: wpage.yoast_head,
                    template: wpage.template,
                    heroTitle: wpage.acf.hero_title,
                    heroFilledButton: wpage.acf.hero_filled_button,
                    heroOutlineButton: wpage.acf.hero_outline_button,
                    heroImg: wpage.acf.hero_image.url,
                    heroImgAlt: wpage.acf.hero_image.alt,
                    underHeroContentSwitch: wpage.acf.add_content_under_the_image,
                    underHeroTitle: wpage.acf.under_image_content.title,
                    underHeroParagraph: wpage.acf.under_image_content.paragraph,
                    pageLinks: wpage.acf.page_links,
                    imageSection1: wpage.acf.image_section_1,
                    gatorTextSection: wpage.acf.gator_text_section,
                    imageSection2: wpage.acf.image_section_2,
                    imageSection3: wpage.acf.image_section_3
                };
            } else if (wpage.template == "templates/students.php") {
                return await {
                    id: wpage.id,
                    title: wpage.title.rendered,
                    slug: wpage.slug,
                    modified: wpage.modified,
                    link: wpage.link,
                    yoast: wpage.yoast_head,
                    template: wpage.template,
                    heroTitle: wpage.acf.hero_title,
                    heroFilledButton: wpage.acf.hero_filled_button,
                    heroOutlineButton: wpage.acf.hero_outline_button,
                    heroImg: wpage.acf.hero_image.url,
                    heroImgAlt: wpage.acf.hero_image.alt,
                    underHeroContentSwitch: wpage.acf.add_content_under_the_image,
                    underHeroTitle: wpage.acf.under_image_content.title,
                    underHeroParagraph: wpage.acf.under_image_content.paragraph,
                    pageLinks: wpage.acf.page_links,
                };
            } else if (wpage.template == "templates/apply-for-career.php") {
                return await {
                    id: wpage.id,
                    title: wpage.title.rendered,
                    slug: wpage.slug,
                    modified: wpage.modified,
                    link: wpage.link,
                    yoast: wpage.yoast_head,
                    template: wpage.template,
                    heroTitle: wpage.acf.hero_title,
                    heroImg: wpage.acf.hero_image.url,
                    heroImgAlt: wpage.acf.hero_image.alt,
                    beforeFormContent: wpage.acf.before_form_content
                };
            } else if (wpage.template == "templates/pta.php") {
                return await {
                    id: wpage.id,
                    title: wpage.title.rendered,
                    slug: wpage.slug,
                    modified: wpage.modified,
                    link: wpage.link,
                    yoast: wpage.yoast_head,
                    template: wpage.template,
                    parentPageSlug: wpage.parent_slug,
                    heroTitle: wpage.acf.hero_title,
                    heroImg: wpage.acf.hero_image.url,
                    heroImgAlt: wpage.acf.hero_image.alt,
                    heroFilledButton: wpage.acf.hero_filled_button,
                    heroOutlineButton: wpage.acf.hero_outline_button,
                    pageContent: wpage.content.rendered
                };
            } else if (wpage.template == "templates/giving.php") {
                return await {
                    id: wpage.id,
                    title: wpage.title.rendered,
                    slug: wpage.slug,
                    modified: wpage.modified,
                    link: wpage.link,
                    yoast: wpage.yoast_head,
                    template: wpage.template,
                    heroTitle: wpage.acf.hero_title,
                    heroFilledButton: wpage.acf.hero_filled_button,
                    heroOutlineButton: wpage.acf.hero_outline_button,
                    heroImg: wpage.acf.hero_image.url,
                    heroImgAlt: wpage.acf.hero_image.alt,
                    underHeroContentSwitch: wpage.acf.add_content_under_the_image,
                    underHeroTitle: wpage.acf.under_image_content.title,
                    underHeroParagraph: wpage.acf.under_image_content.paragraph,
                    underHeroFigures: wpage.acf.under_image_content.figures,
                    imageSection1: wpage.acf.image_section_1,
                    gatorTextSection: wpage.acf.gator_text_section,
                    imageSection2: wpage.acf.image_section_2,
                    imageSection3: wpage.acf.image_section_3
                };
            } else if (wpage.template == "templates/policy-page.php") {
                return await {
                    id: wpage.id,
                    title: wpage.title.rendered,
                    slug: wpage.slug,
                    modified: wpage.modified,
                    link: wpage.link,
                    yoast: wpage.yoast_head,
                    template: wpage.template,
                    pageContent: wpage.content.rendered
                };
            } else if (wpage.code !== "rest_post_invalid_page_number" && wpage.template == "templates/information-page.php") {
                if (wpage.acf.add_content_under_the_image == 'Yes') {
                    return await {
                        id: wpage.id,
                        title: wpage.title.rendered,
                        slug: wpage.slug,
                        modified: wpage.modified,
                        link: wpage.link,
                        yoast: wpage.yoast_head,
                        template: wpage.template,
                        parentPageTitle: wpage.parent_title,
                        parentPageSlug: wpage.parent_slug,
                        childrenPages: wpage.children_pages,
                        heroTitle: wpage.acf.hero_title,
                        heroFilledButton: wpage.acf.hero_filled_button,
                        heroOutlineButton: wpage.acf.hero_outline_button,
                        heroImg: wpage.acf.hero_image.url,
                        heroImgAlt: wpage.acf.hero_image.alt,
                        heroVideo: wpage.acf.hero_video,
                        underHeroContentSwitch: wpage.acf.add_content_under_the_image,
                        underHeroTitle: wpage.acf.under_image_content.title,
                        underHeroParagraph: wpage.acf.under_image_content.paragraph,
                        underHeroButton: wpage.acf.under_image_content.button,
                        underHeroFigures: wpage.acf.under_image_content.figures,
                        pageContent: wpage.content.rendered,
                        pageSections: wpage.acf.page_sections,
                    };
                } else {
                    return await {
                        id: wpage.id,
                        title: wpage.title.rendered,
                        slug: wpage.slug,
                        modified: wpage.modified,
                        link: wpage.link,
                        yoast: wpage.yoast_head,
                        template: wpage.template,
                        parentPageTitle: wpage.parent_title,
                        parentPageSlug: wpage.parent_slug,
                        childrenPages: wpage.children_pages,
                        heroTitle: wpage.acf.hero_title,
                        heroFilledButton: wpage.acf.hero_filled_button,
                        heroOutlineButton: wpage.acf.hero_outline_button,
                        heroImg: wpage.acf.hero_image.url,
                        heroImgAlt: wpage.acf.hero_image.alt,
                        heroVideo: wpage.acf.hero_video,
                        underHeroContentSwitch: wpage.acf.add_content_under_the_image,
                        pageContent: wpage.content.rendered,
                        pageSections: wpage.acf.page_sections,
                    };
                }
            } else if (wpage.code !== "rest_post_invalid_page_number") {
                return await {
                    id: wpage.id,
                    title: wpage.title.rendered,
                    slug: wpage.slug,
                    modified: wpage.modified,
                    link: wpage.link,
                    yoast: wpage.yoast_head,
                    template: wpage.template,
                };
            } else {
                return await {
                    slug: Math.random(),
                    link: Math.random(),
                    disabled: 'Yes'
                };
            }
        })
    );
}

module.exports = async () => {
    const wpages = await fetchPages();
    const processedWpages = await processPages(wpages);
    return processedWpages;
};