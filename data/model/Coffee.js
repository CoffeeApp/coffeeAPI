
var bookshelf = require('../bookshelf')

var Coffee = bookshelf.Model.extend({
  tableName: 'coffee',
  shops: function() {
    return this.belongsToMany('Shop', 'shop_coffee');
  }
});

module.exports = bookshelf.model('Coffee', Coffee);
