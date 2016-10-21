var bookshelf = require('../bookshelf')
var OrderDetail = require('./OrderDetail')
var Shop = require('./Shop')

var Order = bookshelf.Model.extend({
  tableName: 'order',
  orderDetails: function() {
    return this.hasMany(OrderDetail, 'order_detail');
  },
  shop: function() {
    return this.belongsTo(Shop, 'order')
  }
});

module.exports = Order
