var coffee = require('../seed_data/coffee')
var order_detail = require('../seed_data/order_detail')
var order = require('../seed_data/order')
var shop_coffee = require('../seed_data/shop_coffee')
var shop = require('../seed_data/shop')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    knex('shop_coffee').del(),
    knex('order_detail').del(),
    knex('order').del(),
    knex('coffee').del(),
    knex('shop').del()
  ]).then(() => {
    return knex('coffee')
      .insert(coffees)
      .then(() => {
        return knex('shop_coffee')
          .insert(shop_coffees)
          .then(() => {
            return knex('order_detail')
              .insert(order_details)
          })
      })
  })
};
