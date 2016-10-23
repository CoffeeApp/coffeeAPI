
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shop').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('shop').insert({
          name:"Fidel's Cafe",
          lat: '-41.291544',
          lng: '174.773899',
          phone: '04-801 6868',
          address: '234 Cuba St, Te Aro, Wellington 6011',
          website: 'http://www.fidelscafe.com/',
          beans: 'Beans A',
          rating: 5,
          image: 'http://www.fidelscafe.com/sites/all/themes/fidels/images/layout/menu_closed_bkg.png',
          description: 'Brothers & sisters of the revolution! Welcome to Fidel’s. Where the coffee is Cuban and the hospitality is pure New Zealand.'}),
        knex('shop').insert({
          name:'Raglan Roast',
          lat: '-41.2964276',
          lng: '174.7728275',
          phone: '04-801 6558',
          address: '40 Abel Smith St, Te Aro, Wellington 6011',
          website: 'https://www.raglanroast.co.nz/',
          beans: 'Raglan Roast',
          rating: 5,
          image: 'http://main-cdn.grabone.co.nz/goimage/440x267/ixplxb4.jpg',
          description: 'Raglan Roast coffee is roasted daily at our "Hole in the Wall" coffee shop located in Volcom Lane and at the Te Uku Roast Office, Raglan New Zealand.'}),
        knex('shop').insert({
          name:'Havana Bar',
          lat: '-41.2964276',
          lng: '174.7739219',
          phone: '04-384 7039',
          address: '32a - 34 Wigan St, Te Aro, Wellington 6011',
          website: 'https://www.havanabar.co.nz',
          beans: 'Beans B',
          rating: 5,
          image: 'http://2014.reelbrazil.co.nz/wp-content/uploads/2014/03/Havana-2.png',
          description: 'Tapas, wine & cocktails served in colorful, side-by-side cottages with a hip, throwback Latin vibe.'}),
        knex('shop').insert({
          name:'Laundry',
          lat: '-41.2964276',
          lng: '174.7739219',
          phone: '04-384 4280',
          address: '242 Cuba St, Te Aro, Wellington 6011',
          website: 'https://www.laundry.net.nz',
          beans: 'Beans C',
          rating: 5,
          image: 'https://scontent-syd1-1.xx.fbcdn.net/t31.0-8/13735627_524281767778006_7802785301809894470_o.jpg',
          description: 'One day Chung had a dream. So he rounded up 3 of his best friends and said "We should create a lounge/bar here in this space." As a collective the Laundry team will create a unique culture and environment that is positive, fun and rewarding for all.'}),
        knex('shop').insert({
          name:'Southern Cross',
          lat: '-41.2964276',
          lng: '174.7739219',
          phone: '04-384 9085',
          address: '39 Abel Smith St, Te Aro, Wellington 6011',
          website: 'https://www.thecross.co.nz',
          beans: 'Beans D',
          rating: 5,
          image: 'http://www.dineout.co.nz/assets/4777_Southern_Cross_Logo.jpg',
          description: 'Longtime, family-friendly spot with a leafy patio offering pub eats, drinks & diverse events. '})
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
              comment: 'no sugar, no milk',
              new_date: new Date()
            }),
            knex('order').insert({
              name: 'Thomas',
              phone: '021 293 1231',
              status: 'new',
              shop_id: 2,
              comment: 'a lot of sugar',
              new_date: new Date()
            }),
            knex('order').insert({
              name: 'Lisa',
              phone: '021 123 5675',
              status: 'new',
              shop_id: 2,
              comment: 'no coffee beans',
              new_date: new Date()
            })
          ]);
        });
    })
};
