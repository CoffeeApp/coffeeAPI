
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('order').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('order').insert({
          name: 'peter',
          phone: '021 293 2329',
          status: 'new',
          shop_id: 1,
          comment: 'on time',
          new_date: new Date()
        }),
        knex('order').insert({
          name: 'ben',
          phone: '021 293 2899',
          status: 'new',
          shop_id: 1,
          comment: 'on time',
          new_date: new Date()
        })
      ]);
    });
};
