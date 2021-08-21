const mongoose = require('mongoose');
//const {cronPlugin} = require('mongoose-cron');
require('./Schemas/dataSchema');
require('./Schemas/upcSchema');
require('./Schemas/amazonSchema');

const dataModel = mongoose.model('data');
const upcModel = mongoose.model('upc');
const amazonModel = mongoose.model('amazon');

//let cron = upcModel.createCron().start();

module.exports = {
    dataModel,
    upcModel,
    amazonModel
}
