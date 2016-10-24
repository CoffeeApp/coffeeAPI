
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shop').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('shop').insert({
          name: "Fidel's Cafe",
          lat: '-41.291544',
          lng: '174.773899',
          phone: '04 801 6868',
          address: '234 Cuba St, Te Aro, Wellington 6011',
          website: 'http://www.fidelscafe.com/',
          beans: 'Beans A',
          rating: 4,
          image: 'http://www.fidelscafe.com/sites/all/themes/fidels/images/layout/menu_closed_bkg.png',
          description: 'Brothers & sisters of the revolution! Welcome to Fidel’s. Where the coffee is Cuban and the hospitality is pure New Zealand.'}),
        knex('shop').insert({
          name: 'Raglan Roast',
          lat: '-41.2964276',
          lng: '174.7728275',
          phone: '04 801 6558',
          address: '40 Abel Smith St, Te Aro, Wellington 6011',
          website: 'https://www.raglanroast.co.nz/',
          beans: 'Raglan Roast',
          rating: 3.5,
          image: 'http://main-cdn.grabone.co.nz/goimage/440x267/ixplxb4.jpg',
          description: 'Raglan Roast coffee is roasted daily at our "Hole in the Wall" coffee shop located in Volcom Lane and at the Te Uku Roast Office, Raglan New Zealand.'}),
        knex('shop').insert({
          name: 'Prefab',
          lat: '-41.29583365',
          lng: '174.77284985',
          phone: '04 385 2263',
          address: '14 Jessie Street, Wellington City 6011',
          website: 'http://www.pre-fab.co.nz/',
          beans: 'Acme & Co',
          rating: 4.5,
          image: 'https://pbs.twimg.com/profile_images/3501080620/174c916cdb3c58a96958b9897dad96d4.jpeg',
          description: 'Coffee, roasted on site, served as espresso and bottomless filter from 7am!'}),
        knex('shop').insert({
          name: 'Customs by Coffee Supreme',
          lat: '-41.2936226',
          lng: '174.7739927',
          phone: '04 385 2129',
          address: '39 Ghuznee Street, Wellington, 6011',
          website: 'https://www.coffeesupreme.com/',
          beans: 'Supreme Coffee',
          rating: 4.8
          image: 'https://www.coffeesupreme.com/images/misc/supreme_logo_website.gif',
          description: 'Customs coffee menu has both espresso and filter offerings. Whilst stocking fresh doughnuts daily it also boasts some of the finest toast in Wellington. '}),
        knex('shop').insert({
          name: 'Southern Cross',
          lat: '-41.2964276',
          lng: '174.7739219',
          phone: '04 384 9085',
          address: '39 Abel Smith St, Wellington 6011',
          website: 'https://www.thecross.co.nz',
          beans: 'Havana',
          rating: 4.0,
          image: 'http://www.dineout.co.nz/assets/4777_Southern_Cross_Logo.jpg',
          description: 'Longtime, family-friendly spot with a leafy patio offering pub eats, drinks & diverse events.'})
        knex('shop').insert({
          name: "Caffe L'affare",
          lat: '-41.2961437',
          lng: '174.7780815',
          phone: '04 385 9748',
          address: '27 College St, Wellington 6011',
          website: 'http://www.laffare.co.nz/',
          beans: "L'affare Primo",
          rating: 4.5,
          image: 'https://media-cdn.tripadvisor.com/media/photo-s/05/6f/d4/0f/cafe-l-affare.jpg',
          description: 'Single origins, blends, Fairtrade hot chocolate, espresso machines & brewing equipment.'})
        knex('shop').insert({
          name: "Memphis Belle",
          lat: '-41.2919467',
          lng: '174.7751762',
          phone: '021 244 8626',
          address: '38 Dixon Street, 6011',
          website: 'https://www.facebook.com/memphisbellecoffeehouse/',
          beans: "People's Coffee",
          rating: 3.4,
          image: 'https://static.grouponnz.co.nz/52/73/1311559627352.jpg',
          description: 'Heaps, too much to write. Come in and see them, but more importantly drink our coffee and you give us your own award!'})
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
