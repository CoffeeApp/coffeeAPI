var bookshelf = require('../bookshelf')

var Shop = bookshelf.Model.extend({
  tableName: 'shop',
  coffees: function() {
    return this.belongsToMany('Coffee', 'shop_coffee')
      .withPivot(['price']);
  }
});

module.exports = bookshelf.model('Shop', Shop);
