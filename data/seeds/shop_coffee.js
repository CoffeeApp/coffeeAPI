
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shop_coffee').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('shop_coffee').insert({coffee_id: 1, shop_id: 1, price: 1}),
        knex('shop_coffee').insert({coffee_id: 2, shop_id: 1, price: 2}),
        knex('shop_coffee').insert({coffee_id: 3, shop_id: 1, price: 3}),
        knex('shop_coffee').insert({coffee_id: 4, shop_id: 1, price: 3.5}),
        knex('shop_coffee').insert({coffee_id: 5, shop_id: 1, price: 4.5}),
        knex('shop_coffee').insert({coffee_id: 6, shop_id: 1, price: 4}),
        knex('shop_coffee').insert({coffee_id: 7, shop_id: 1, price: 5}),
        knex('shop_coffee').insert({coffee_id: 8, shop_id: 1, price: 6.5}),
        knex('shop_coffee').insert({coffee_id: 1, shop_id: 2, price: 10}),
        knex('shop_coffee').insert({coffee_id: 2, shop_id: 2, price: 20}),
        knex('shop_coffee').insert({coffee_id: 3, shop_id: 2, price: 30}),
        knex('shop_coffee').insert({coffee_id: 4, shop_id: 2, price: 35}),
        knex('shop_coffee').insert({coffee_id: 5, shop_id: 2, price: 45}),
        knex('shop_coffee').insert({coffee_id: 6, shop_id: 2, price: 40}),
        knex('shop_coffee').insert({coffee_id: 7, shop_id: 2, price: 50}),
        knex('shop_coffee').insert({coffee_id: 8, shop_id: 2, price: 65})
      ]);
    });
};
