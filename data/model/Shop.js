var knex = require('../index')
var bookshelf = require('bookshelf')(knex);
var Coffee = require('./Coffee')

var Shop = bookshelf.Model.extend({
  tableName: 'shop',
  coffees: function() {
    return this.belongsToMany(Coffee, 'shop_coffee');
  }
});

module.exports = Shop
