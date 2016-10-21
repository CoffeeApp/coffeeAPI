var knex = require('../index')
var bookshelf = require('bookshelf')(knex);
var Shop = require('./Shop')

var Coffee = bookshelf.Model.extend({
  tableName: 'coffee',
  shops: function() {
    return this.belongsToMany(Shop, 'shop_coffee');
  }
});

module.exports = Coffee
