
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shop_order').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        //knex('shop_order').insert({shop_id: 1, order_id: 1})
      ]);
    });
};
