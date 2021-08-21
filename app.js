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
        let data = 'hello from Armenia!';
        console.log(data)
        res.status(200).send({msg: data})
    } catch (ex) {
        res.status(200).send(ex)
    }
})

let PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`app is listening ${PORT}`);
})