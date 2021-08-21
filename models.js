const mongoose = require('mongoose');
require('./Schemas/dataSchema');
require('./Schemas/upcSchema');
require('./Schemas/amazonSchema');

const dataModel = mongoose.model('data');
const upcModel = mongoose.model('upc');
const amazonModel = mongoose.model('amazon');

module.exports = {
    dataModel,
    upcModel,
    amazonModel
}
