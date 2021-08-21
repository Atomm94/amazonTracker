const { Schema, model } = require('mongoose');
const {cronPlugin} = require('mongoose-cron');

const upcSchema = new Schema({
    href: String,
    upc: String
})

upcSchema.plugin(cronPlugin, {
    handler: doc => console.log('processing', doc)
});

const upcModel = model('upc', upcSchema)