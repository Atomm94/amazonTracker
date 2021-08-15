const { Schema, model } = require('mongoose');

const upcSchema = new Schema({
    href: String,
    upc: String
})

const upcModel = model('upc', upcSchema)