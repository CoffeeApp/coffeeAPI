const knex = require('../index')
const _ = require('lodash')
module.exports = {
  findOrder,
  getOrderDetails
}

function getOrderDetails(orders) {
  var promiseArray = _.map(orders, (order) => {
    return getOrderDetails(order)
  })

  return Promise.all(promiseArray)
}
function getOrderDetail(order) {
  return knex('order_detail')
    .join('coffee', 'order_detail.coffee_id', 'coffee.id')
    .andWhere('order_detail.order_id', order.order_id)
    .select('type', 'quantity', 'milk', 'sugar', 'note')
    .then(coffees => {
      order.coffees = coffees
      return Promise.resolve(order)
    })
}
function findOrder(query) {
  return knex('order')
    .join('shop', 'shop.id', 'order.shop_id')
    .where(function() {
      if(query && query.notIn == 'new') {
        this.whereNot('order.status', query.notIn)
      }
    })
    .andWhere(function() {
      if(query && query.phone) {
        this.where('order.phone', query.phone)
      }
    })
    .andWhere(function() {
      if(query && query.shop_id) {
        this.where('shop.id', query.shop_id)
      }
    })
    .andWhere(function() {
      if(query && query.order_id) {
        this.where('order.id', query.order_id)
      }
    })
    .select(
      'order.id as order_id',
      'shop.id as shop_id',
      'shop.name as shop_name',
      'order.name',
      'order.phone',
      'status',
      'comment',
      'ready_time',
      'new_date as ordered'
    )
}
