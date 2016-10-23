var seed_data = require('../seed_data')
var shop_coffees = seed_data.shop_coffees
var coffees = seed_data.coffees
console.log(shop_coffees);
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    knex('shop_coffee').del(),
    knex('coffee').del()
  ]).then(() => {
    return knex('coffee')
      .insert(coffees)
      .then(() => {
        return knex('shop_coffee').insert(shop_coffees)
      })
  })
};
