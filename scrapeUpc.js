const puppeteer = require('puppeteer');
// const dataModel = require('./models').dataModel
const upcModel = require('./models').upcModel
const jsonFile = require('jsonfile')
const cron = require('node-cron');


const scrapeUpc = (async (urlData) => {
    console.time('tm');
    const browser = await puppeteer.launch({
        args: ['--no-sandbox']
    });

    //let urlData = await dataModel.find();
    //let urlArray = ["https://www.4sgm.com/product/36967/25-PVC-Rectangular-Bath-Mat.html","https://www.4sgm.com/product/36976/27-PVC-Oval-Bath-Mat.html","https://www.4sgm.com/product/36970/27-PVC-Rectangular-Bath-Mat.html","https://www.4sgm.com/product/36963/39-PVC-Clear-Rectangular-Bath-Mat.html","https://www.4sgm.com/product/21793/All-Purpose-Bath-Mat.html","https://www.4sgm.com/product/55977/Anti-Slip-Mat--11.8X59--3-Assortments.html","https://www.4sgm.com/product/55976/Anti-Slip-Mat--8x69--3-Assortments.html","https://www.4sgm.com/product/55978/Bath-Mat--17X36--Assorted.html","https://www.4sgm.com/product/32565/Bath-Mat--27x14-3-Assortments.html","https://www.4sgm.com/product/36973/Non-Slip-Bath-%2526-Shower-Mat.html","https://www.4sgm.com/product/51197/Oval-Bath-Mat--26--4-Assortments.html","https://www.4sgm.com/product/32566/PVC-Bath-Mat--26x-14--2-Assortments.html","https://www.4sgm.com/product/51201/PVC-Bath-Mat--27.5--4-Assortments.html","https://www.4sgm.com/product/32563/PVC-Bath-Mat--39-X-16--2-Assortments.html","https://www.4sgm.com/product/51194/PVC-Rectangular-Bath-Mat--27.5--4-Assortments.html","https://www.4sgm.com/product/51191/PVC-Rectangular-Bath-Mat--27.5--4-Assortments.html","https://www.4sgm.com/product/51200/PVC-Rectangular-Bath-Mat--28--4-Assortments.html","https://www.4sgm.com/product/51217/PVC-Rectangular-Bath-Mat--34.6--4-Assortments.html","https://www.4sgm.com/product/51215/PVC-Rectangular-Bath-Mat--34.6--4-Assortments.html","https://www.4sgm.com/product/51212/PVC-Rectangular-Bath-Mat--34.6--Assorted.html","https://www.4sgm.com/product/51218/PVC-Rectangular-Bath-Mat--39--4-Assortments.html","https://www.4sgm.com/product/51202/Rectangular-Bath-Mat--27.5--4-Assortments.html","https://www.4sgm.com/product/51193/Rectangular-Bath-Mat--27.5--4-Assortments.html","https://www.4sgm.com/product/51192/Oval-Bath-Mat--27.5--4-Assortments.html","https://www.4sgm.com/product/48009/15-Piece-Bathroom-Set--2-Assortments.html","https://www.4sgm.com/product/51220/PVC-Bath-Mat--27.5--4-Assortments.html","https://www.4sgm.com/product/47989/Rectangle-Bath-Mat--18x30--2-Assortments.html","https://www.4sgm.com/product/47990/Microfiber-Bath-Mat--18x30--2-Assortments.html","https://www.4sgm.com/product/36974/27-PVC-Oval-Shell-Bath-Mat.html","https://www.4sgm.com/product/47988/Mcdallion-Bath-Mat--18x30-Microfiber-blue.html","https://www.4sgm.com/product/30623/23.6-Door-Mat.html","https://www.4sgm.com/product/36971/28-PVC-Rectangular-Bath-Mat.html","https://www.4sgm.com/product/37669/3-Piece-Bath-Mat-Set--3-Assortments.html","https://www.4sgm.com/product/37666/3-Piece-Bath-Mat-Set--4-Assortments.html","https://www.4sgm.com/product/37668/3-Piece-Bath-Mat--4-Assortments.html","https://www.4sgm.com/product/37667/3-Piece-Embossed-Bath-Mat-Set--4-Assortments.html","https://www.4sgm.com/product/55975/Anti-Slip-Mat--8x59--3-Assortments.html","https://www.4sgm.com/product/32570/BATH-MAT,26.7x14.5-PVC-4ASTD.html","https://www.4sgm.com/product/30702/Bath-Mat--24--4-Assorted-Colors.html","https://www.4sgm.com/product/32569/Bath-Mat--26X14-3-Assortments.html","https://www.4sgm.com/product/32567/Bath-Mat--27X14-3-Assortments.html","https://www.4sgm.com/product/32564/Bath-and-Shower-Mat--27-x-15--3-Assortments.html","https://www.4sgm.com/product/32568/Bath-and-Shower-Mat--27-x-15--4-Assortments.html","https://www.4sgm.com/product/99960/Checkered-Bath-Mat-3-piece-Set---9-Asst.html","https://www.4sgm.com/product/52473/Chenille-Bath-Mat--15x22.8--Assorted.html","https://www.4sgm.com/product/43973/Chenille-Bath-Mat--15.7-x-23.6--3-Assortments.html"]
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
            console.log(upcData)
        }
    }

    await upcModel.insertMany(upcData)
    //await jsonFile.writeFileSync('yes.json', upcData, { spaces: 2 })
    let pages = await browser.pages();
    await Promise.all(pages.map(page =>page.close()));

    await browser.close();

     console.log('finish')
    console.timeEnd('tm')
    return JSON.stringify(urlArray);
})();



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
// let job = cron.schedule('*/1 * * * *', async () => {
//      let urlData = await dataModel.find();
//     // let data = [];
//     // let startIndex = 0;
//
//     // if (urlData !== []) {
//     //     for (let i = 0; i < urlData.length; i++) {
//     //         for (let j = 0; j < urlData[i].urlArray.length; j++) {
//     //             data.push(urlData[i].urlArray[j])
//     //         }
//     //     }
//     // } else {
//     //     await job.stop();
//     // }
//     // if (urlData !== []) {
//     //     for (let i = 0; i < 20; i++) {
//     //         data.push(urlData[0].urlArray[i])
//     //     }
//     //     console.log(data)
//     //     //await dataModel.updateOne({urlData[0][_id]})
//     // }
//     console.log('running a task every minute');
//     console.log(urlData)
//     //await scrapeUpc();
//    // startIndex += 20;
//     await job.stop();
// });


module.exports = {
    scrapeUpc
}