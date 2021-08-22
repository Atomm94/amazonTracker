const puppeteer = require('puppeteer');
const upcModel = require('./models').upcModel
const cron = require('node-cron');

const scrapeUpc = async (urlData) => {
    console.time('tm');
    console.log('afssfdfdf')
    console.log(urlData)
    const browser = await puppeteer.launch({
        args: ['--no-sandbox']
    });
    console.log(urlData.length)
    let count=0;
    let upcData = [];
    let interval = 0;
    let urlArray;

    for (let d = 0; d < urlData.length; d++) {
        console.log(urlData[d].urlArray)
        urlArray = urlData[d].urlArray;
        for(let index=0; index< urlArray.length; index++) {
            const page = await browser.newPage();
            interval++
            if(interval === 20) {
                await delay(10000);
                interval = 0;
            }
            console.log('hi there')

            try {
                await page.goto(urlArray[index],  {waitUntil: 'load', timeout: 0});
            } catch (err) {
                console.log(err)
            }
            console.log('hello')
            console.log(count++)
            const teams = await page.evaluate( () => {
                let db;

                const tds = Array.from(document.querySelectorAll("div.spec_info"));

                tds.map((a, i) => {
                    if(i === 2) db = {
                        href: document.location.href,
                        upc: a.textContent.split('\n')[1].trim().split("'")[1] || null
                    }
                    return;
                });

                return db;
            })

            await upcData.push(teams);
        }
    }

    await upcModel.insertMany(upcData)

    let pages = await browser.pages();
    await Promise.all(pages.map(page =>page.close()));

    await browser.close();

     console.log('finish')
    console.timeEnd('tm')
    return JSON.stringify(urlArray);
};



async function delay(ms) {
    // return await for better async stack trace support in case of errors.
    return await new Promise(resolve => setTimeout(resolve, ms));
}


module.exports = {
    scrapeUpc
}