const { Schema, model } = require('mongoose');

const dataSchema = new Schema({
    urlArray: [String]
})

const dataModel = model('data', dataSchema)