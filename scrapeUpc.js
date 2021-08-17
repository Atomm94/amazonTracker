const puppeteer = require('puppeteer');
const dataModel = require('./models').dataModel
const upcModel = require('./models').upcModel
const cron = require('node-cron');


const scrapeUpc = async () => {
    console.time('tm');
    const browser = await puppeteer.launch({
        args: ['--no-sandbox']
    });

    let urlData = await dataModel.find();
    let count=0;
    let upcData = [];
    let interval = 0;
    let urlArray;
    for (let d = 0; d < urlData.length; d++) {
        urlArray = urlData[d].urlArray;

        for(let index=0; index< urlArray.length; index++) {
            const page = await browser.newPage();
            interval++
            if(interval === 20) {
                await delay(10000);
                interval = 0;
            }
            await page.goto(urlArray[index],  {waitUntil: 'load', timeout: 0});

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
    return JSON.stringify(urlData);
};



async function delay(ms) {
    // return await for better async stack trace support in case of errors.
    return await new Promise(resolve => setTimeout(resolve, ms));
}

// let day = new Date().getDate()
// let month = new Date().getMonth() + 1
// let hour = new Date().getHours()
// let minutes = new Date().getMinutes() + 1
// let time = `${minutes} ${hour} ${day} ${month} *`
//
// let job = cron.schedule(time, async () => {
//     console.log('running a task every minute');
//     await scrapeUpc();
//     job.stop();
// });

module.exports = {
    scrapeUpc
}