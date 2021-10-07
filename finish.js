const jsonfile = require('jsonfile')

const jb = async () => {
    let allAmazon = await jsonfile.readFileSync('allAmazonData.json')
    let db = [];
    allAmazon.map(item => {
        if(item.text.split('results').length === 1) {
            db.push(item)
        }
    })
    await jsonfile.writeFileSync('finishData.json', db, { spaces: 2 })
}

jb()