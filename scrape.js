//const url = 'https://www.4sgm.com/category/93/Footwear.html?keywords=&facetNameValue=Category_value_Footwear&facetNameValue=Category_value_Footwear&sgmView=gridView&sort=inventory_afs&size=24&page=1';
const puppeteer = require('puppeteer');
const dataModel = require('./models').dataModel

const scrape = async (url) => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(url);
    let dataArray = [];
    let dataFinish = [];
    let lastPageNumber = 2;
    for (let index = 0; index < lastPageNumber; index++) {
        // wait 1 sec for page load
        console.log('ok')
        await page.waitForTimeout(15000);

        dataFinish = await extractedEvaluateCall(page)
        dataFinish.map(item => {
            dataArray.push(item);
        })
        // this is where next button on page clicked to jump to another page
        if (index !== lastPageNumber - 1) {

            await page.evaluate((selector) => document.querySelector(selector).click(), 'a.pageNavNext');
        }
    }

     await dataModel.create({urlArray: dataArray})

     await browser.close();
     console.log('finish')
     return JSON.stringify(dataArray);
};



async function extractedEvaluateCall(page) {

    return page.evaluate(() => {
        const tds = Array.from(document.querySelectorAll("h4.product_name a"));

        let add = [];

        let db = [];
        tds.map(a => db.push(a.href));
        return db;
    });
}

module.exports = {
    scrape
}