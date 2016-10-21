
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shop_coffee').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('shop_coffee').insert({coffee_id: 1, shop_id: 1, price: 3.5}),
        knex('shop_coffee').insert({coffee_id: 2, shop_id: 1, price: 4.5}),
        knex('shop_coffee').insert({coffee_id: 3, shop_id: 1, price: 4})
      ]);
    });
};
