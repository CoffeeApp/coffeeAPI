var bookshelf = require('../bookshelf')

var Order = bookshelf.Model.extend({
  tableName: 'order',
  shop: function() {
    return this.belongsTo('Shop', 'shop_id')
  }
});

module.exports = bookshelf.model('Order', Order);
