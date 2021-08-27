const puppeteer = require('puppeteer');
const upcModel = require('./models').upcModel;
const amazonModel = require('./models').amazonModel;
const jsonfile = require('jsonfile')

const scrapeAmazon = async () => {
    console.time('aaa');
    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--single-process'
        ]
    });

    //let ii = await upcModel.find();

    let data = [];
    let splitedText;
    let count = 0;
    //let newData = [];
    let finishData = [];
    let interval = 0;

    // for (let j=0; j<ii.length; j++) {
    //     if (ii[j].upc !== null) {
    //         newData.push(ii[j])
    //     }
    // }

    let newData = await jsonfile.readFileSync('upc.json');

    for(let index=0; index< newData.length; index++) {
        const page = await browser.newPage();
        interval++
        if(interval === 20) {
            await delay(10000);
            interval = 0;
        }
        console.log(count++)
        await page.goto(`https://www.amazon.com/s?k=${newData[index].upc}`,  {waitUntil: 'load', timeout: 0});
        // await page.waitForResponse(response => console.log(response.status()))
        let teams = await page.evaluate( () => {
            const tds = Array.from(document.querySelectorAll("div.a-row"));
            let db;
            tds.map((el, i) => {
                if(i === 0) db = {
                    text: el.textContent,
                    href: document.location.href,
                }
                return;
            })
            //db.mainHref = ii[index].href
            return db;
        })
 
        if(!teams.text.includes('No') && !teams.text.includes('results')) {
            teams.mainHref = newData[index].href
            await amazonModel.create(teams)
        }
        //teams.mainHref = newData[index].href
        data.push(teams)
        await jsonfile.writeFileSync('amazon.json', data, { spaces: 2 })
        //await amazonModel.create(teams)
        // await data.map(item => {
        //     splitedText = item.text.split(' ')
        //     if (!splitedText.includes('No') && !splitedText.includes('results')) {
        //         finishData.push(item)
        //     }
        // })

    }

    //await amazonModel.insertMany(finishData)

    console.log('finish')

    let pages = await browser.pages();
    await Promise.all(pages.map(page =>page.close()));

    await browser.close();

    console.timeEnd('aaa')

    return JSON.stringify(data);

};


async function delay(ms) {
    // return await for better async stack trace support in case of errors.
    return await new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    scrapeAmazon
}