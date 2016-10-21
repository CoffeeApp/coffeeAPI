
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('order_detail').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('order_detail').insert({
          order_id: 1,
          coffee_id: 1,
          shop_id:1,
          quantity:3,
          milk:2,
          sugar:1
        }),
        knex('order_detail').insert({
          order_id: 1,
          coffee_id: 2,
          shop_id:1,
          quantity:2,
          milk:3,
          sugar:2
        }),
        knex('order_detail').insert({
          order_id: 1,
          coffee_id: 3,
          shop_id:1,
          quantity:33,
          milk:4,
          sugar:3
        })
      ]);
    });
};
