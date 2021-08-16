var cron = require('node-cron');

let day = new Date().getDate()
let month = new Date().getMonth() + 1
let hour = new Date().getHours()
let minutes = new Date().getMinutes() + 1

let time = `${minutes} ${hour} ${day} ${month} *`

let job = cron.schedule(time, async () => {
    console.log('running a task every minute');
    await setTimeout(async () => {
        console.log('abu')
    }, 5000)
    job.stop();
});


