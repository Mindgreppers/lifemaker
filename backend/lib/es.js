var EpicSearch = require('epicsearch')
// database connection
module.exports = new EpicSearch(require('../config').epicsearch);
