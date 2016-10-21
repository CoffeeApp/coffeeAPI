
var bookshelf = require('../bookshelf')
var Shop = require('./Shop')

var Coffee = bookshelf.Model.extend({
  tableName: 'coffee',
  shops: function() {
    return this.belongsToMany(Shop, 'shop_coffee');
  }
});

module.exports = Coffee
