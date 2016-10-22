var knex = require('./index')
var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry')
module.exports = bookshelf
