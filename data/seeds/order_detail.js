
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('order_detail').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('order_detail').insert({
          order_id: 1,
          coffee_id: 1,
          quantity:3,
          milk:'trim',
          sugar:1,
          note: 'seeded note'
        }),
        knex('order_detail').insert({
          order_id: 1,
          coffee_id: 2,
          quantity:2,
          milk:'trim',
          sugar:2,
          note: 'seeded note'
        }),
        knex('order_detail').insert({
          order_id: 1,
          coffee_id: 3,
          quantity:33,
          milk:'trim',
          sugar:3,
          note: 'seeded note'
        }),
        knex('order_detail').insert({
          order_id: 2,
          coffee_id: 4,
          quantity:2,
          milk:'soy',
          sugar:3,
          note: 'seeded note'
        }),
        knex('order_detail').insert({
          order_id: 2,
          coffee_id: 5,
          quantity:2,
          milk:'soy',
          sugar:3,
          note: 'seeded note'
        }),
        knex('order_detail').insert({
          order_id: 2,
          coffee_id: 6,
          quantity:2,
          milk:'soy',
          sugar:3,
          note: 'seeded note'
        }),
        knex('order_detail').insert({
          order_id: 3,
          coffee_id: 4,
          quantity:2,
          milk:'soy',
          sugar:3,
          note: 'seeded note'
        }),
        knex('order_detail').insert({
          order_id: 3,
          coffee_id: 5,
          quantity:2,
          milk:'soy',
          sugar:3,
          note: 'seeded note'
        }),
        knex('order_detail').insert({
          order_id: 3,
          coffee_id: 6,
          quantity:2,
          milk:'soy',
          sugar:3,
          note: 'seeded note'
        }),
        knex('order_detail').insert({
          order_id: 4,
          coffee_id: 4,
          quantity:2,
          milk:'soy',
          sugar:3,
          note: 'seeded note'
        }),
        knex('order_detail').insert({
          order_id: 4,
          coffee_id: 5,
          quantity:2,
          milk:'soy',
          sugar:3,
          note: 'seeded note'
        }),
        knex('order_detail').insert({
          order_id: 4,
          coffee_id: 6,
          quantity:2,
          milk:'soy',
          sugar:3,
          note: 'seeded note'
        })
      ]);
    });
};
