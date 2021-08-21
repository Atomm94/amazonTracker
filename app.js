const express = require('express');
const app = express();
const request = require('request');
const config = require('./config');
const scrape = require('./scrape');
const scrapeUpc = require('./scrapeUpc');
const amazon = require('./amazon');
const cron = require('node-cron');
const dataModel = require('./models').dataModel

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(express.json());

app.get("/getData", (req, res) => {
    const { url } = req.query
    try {
        request(url, function (error, response, body) {
            res.status(200).send(body)
        });
    } catch (ex) {
        res.status(200).send(ex)
    }
})

app.get("/scrape", async (req, res) => {
    const { url, pages } = req.query
    try {
        let day = new Date().getDate()
        let month = new Date().getMonth() + 1
        let hour = new Date().getHours()
        let minutes = new Date().getMinutes() + 1
        let time = `${minutes} ${hour} ${day} ${month} *`

        let job = cron.schedule(time, async () => {
            console.log('running a task every minute');
            await scrape.scrape(url, pages);
            job.stop();
        });
       //let scrapping = await scrape.scrape(url);
       res.status(200).send({msg: 'ok'});
    } catch (ex) {
        res.status(200).send(ex)
    }
})

app.get("/scrapeUpc", async (req, res) => {
    try {
        let urlData = await dataModel.find();
        let day = new Date().getDate()
        let month = new Date().getMonth() + 1
        let hour = new Date().getHours()
        let minutes = new Date().getMinutes() + 1
        let time = `${minutes} ${hour} ${day} ${month} *`

        let job = cron.schedule(time, async () => {
            console.log('running a task every minute');
            await scrapeUpc.scrapeUpc(urlData)
            job.stop();
        });
        res.status(200).send({msg: 'ok'})
    } catch (ex) {
        res.status(200).send(ex)
    }
})

app.get("/amazon", async (req, res) => {
    try {
        let day = new Date().getDate()
        let month = new Date().getMonth() + 1
        let hour = new Date().getHours()
        let minutes = new Date().getMinutes() + 1
        let time = `${minutes} ${hour} ${day} ${month} *`

        let job = cron.schedule(time, async () => {
            console.log('running a task every minute');
            await amazon.scrapeAmazon();
            job.stop();
        });

        res.status(200).send({msg: 'ok'})
    } catch (ex) {
        res.status(200).send(ex)
    }
})

app.get('/ok', async (req, res) => {
    try {
        let urlData = await dataModel.find();
        let data = [];
        let startIndex = 0;
        let interval = 0;
        for (let i = 0; i < urlData.length; i++) {
            for (let j = 0; j < urlData[i].urlArray.length; j++) {
                interval++;
                data.push(urlData[i].urlArray[j])
            }
        }
        let day = new Date().getDate()
        let month = new Date().getMonth() + 1
        let hour = new Date().getHours()
        let minutes = new Date().getMinutes() + 1

        let job = cron.schedule(time, async () => {
            let scrapingData = [];
            scrapingData = data.slice(startIndex, 20)
            console.log('running a task every minute');
            await scrapeUpc.scrapeUpc(scrapingData);
            startIndex += 20;
            await job.stop();

            day = new Date().getDate()
            month = new Date().getMonth() + 1
            hour = new Date().getHours()
            minutes = new Date().getMinutes() + 1
            console.log(minutes)
            if (startIndex < data.length) {
                await job.start()
            } else {
                await job.stop()
            }
        });



        // console.log(data)
        // console.log(data.length)
        res.status(200).send({msg: data})
    } catch (ex) {
        res.status(200).send(ex)
    }
})

let PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`app is listening ${PORT}`);
})