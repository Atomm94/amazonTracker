 const cron = require('node-cron');
const express = require('express');
 const dataModel = require('./models').dataModel
// let day = new Date().getDate()
// let month = new Date().getMonth() + 1
// let hour = new Date().getHours()
// let minutes = new Date().getMinutes() + 1
//
// let time = `${minutes} ${hour} ${day} ${month} *`
//
// let job = cron.schedule(time, async () => {
//     console.log('running a task every minute');
//     await setTimeout(async () => {
//         console.log('abu')
//     }, 5000)
//     job.stop();
// });
//
// job.start()


//
// const job = cron.schedule('*/1 * * * * *', async function(){
//     job.stop();
//     filter = 'PENDING', slidingTime = 60
//     await heatmap_settings.findOne().select('options filterType').then(setting => {
//         filter = setting.filterType
//         slidingTime = setting.options.slidingTime
//     }).catch(err => console.log(err))
//     await getHeatmapRules()
//     job.start();
// }, {
//     scheduled: true
// })

     (async function d() {
        let data = await dataModel.find().sort({"timestamp": -1}).limit(10);
         console.log(data)
        })()