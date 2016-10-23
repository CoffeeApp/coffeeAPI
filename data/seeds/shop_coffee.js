var seed_data = require('../seed_data')
var shop_coffees = seed_data.shop_coffees
var coffees = seed_data.coffees
var order_details = seed_data.order_details

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    knex('shop_coffee').del(),
    knex('order_detail').del(),
    knex('coffee').del()
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
