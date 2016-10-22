var bookshelf = require('../bookshelf')
var Order = require('./Order')
var Coffee = require('./Coffee')

var OrderDetail = bookshelf.Model.extend({
  tableName: 'order_detail',
  order: function() {
    return this.belongsTo(Order, 'order_detail');
  },

});

module.exports = OrderDetail
