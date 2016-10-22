
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shop').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('shop').insert({name:'fidels Cafe', lat: '-41.291544', lng: '174.773899', phone: '021 0372 213', address: '234 Cuba St', image: '', description: 'rowValue1'}),
        knex('shop').insert({name:'Raglan Coffee', lat: '-41.291544', lng: '174.773899', phone: '028 123 2412', address: '234 Cuba St', image: '', description: 'rowValue2'})
      ]);
    }).then(function() {
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
    })
};
