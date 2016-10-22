var bookshelf = require('../bookshelf')

var OrderDetail = bookshelf.Model.extend({
  tableName: 'order_detail',
  coffee: function() {
    return this.hasOne('Coffee', 'order_detail');
  },
});

module.exports = bookshelf.model('OrderDetail', OrderDetail);

// order: function() {
//   return this.belongsTo('Order', 'order_detail', 'order_id');
// },
