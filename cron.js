  const cron = require('node-cron');
// const express = require('express');
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

     // (async function d() {
     //    let data = await dataModel.find().sort({"timestamp": -1}).limit(10);
     //     console.log(data)
     //    })()

let urlData = [
    1,2,3,4,5,6,7,8,9,4,5,5,2,4,48,8,4,8,44,8,84,984,56,456,44,4,5,2,2,2,21,1,8,
    1,2,3,4,5,6,7,8,9,4,5,5,2,4,48,8,4,8,44,8,84,984,56,456,44,4,5,2,2,2,21,1,8,
    1,2,3,4,5,6,7,8,9,4,5,5,2,4,48,8,4,8,44,8,84,984,56,456,44,4,5,2,2,2,21,1,8,
    1,2,3,4,5,6,7,8,9,4,5,5,2,4,48,8,4,8,44,8,84,984,56,456,44,4,5,2,2,2,21,1,8,
    1,2,3,4,5,6,7,8,9,4,5,5,2,4,48,8,4,8,44,8,84,984,56,456,44,4,5,2,2,2,21,1,8,
    1,2,3,4,5,6,7,8,9,4,5,5,2,4,48,8,4,8,44,8,84,984,56,456,44,4,5,2,2,2,21,1,8,
    1,2,3,4,5,6,7,8,9,4,5,5,2,4,48,8,4,8,44,8,84,984,56,456,44,4,5,2,2,2,21,1,8,
    1,2,3,4,5,6,7,8,9,4,5,5,2,4,48,8,4,8,44,8,84,984,56,456,44,4,5,2,2,2,21,1,8,
    1,2,3,4,5,6,7,8,9,4,5,5,2,4,48,8,4,8,44,8,84,984,56,456,44,4,5,2,2,2,21,1,8,
    1,2,3,4,5,6,7,8,9,4,5,5,2,4,48,8,4,8,44,8,84,984,56,456,44,4,5,2,2,2,21,1,8
];

// let dd = [];
// let interval = 0;
// let c = [];
// for (let i=0; i<urlData.length; i++) {
//     // interval++
//     // dd.push(urlData[i])
//     // console.log(dd.length)
//     // if (interval === 20 || (urlData.length - i) < 20) {
//     //     c = dd;
//     //     dd = [];
//     //     interval = 0;
//     //     console.log(c)
//     // }
//     let b = urlData.length - i;
//     if (b === 20) {
//         console.log('fsf')
//         b = 0;
//     }
// }

//   let day = new Date().getDate()
//   let month = new Date().getMonth() + 1
//   let hour = new Date().getHours()
//   let minutes = new Date().getMinutes() + 1
//   let time = `${minutes} ${hour} ${day} ${month} *`
//
// let job = cron.schedule(time, async () => {
//     console.log('running a task every minute');
//     for (let i=0; i<urlData.length; i++) {
//         urlData
//     }
//     await scrapeUpc.scrapeUpc(urlData);
//     job.stop();
// });

  (async function d () {
      let urlData = await dataModel.find();
      console.log(urlData)
    })()