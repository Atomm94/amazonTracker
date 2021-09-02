const jsonfile = require('jsonfile')

(async () => {
    let allAmazon = await jsonfile.readFileSync('allAmazonData.json')

    allAmazon.map(item => {
        console.log(item.text.split(','))
    })
})()