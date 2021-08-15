const { Schema, model } = require('mongoose');

const amazonSchema = new Schema({
    text: String,
    href: String,
    mainHref: String
})

const amazonModel = model('amazon', amazonSchema)