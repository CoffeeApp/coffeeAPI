var coffees = [
        {
            type: 'Short Black',
            image: 'https://s-media-cache-ak0.pinimg.com/564x/99/94/fe/9994fedb8db160d363719f2acb74acb4.jpg',
            description: 'A Short Black is what Australians call a shot of espresso. It is typically a 30ml espresso served in a small glass with a thick crema floating on top.'
        },
        {
            type: 'Flat White',
            image: 'https://s-media-cache-ak0.pinimg.com/564x/99/94/fe/9994fedb8db160d363719f2acb74acb4.jpg',
            description: 'A type of coffee made with espresso and hot steamed milk, but without the froth characteristic of a cappuccino.'
        },
        {
            type: 'Cold Press',
            image: 'https://s-media-cache-ak0.pinimg.com/564x/99/94/fe/9994fedb8db160d363719f2acb74acb4.jpg',
            description: 'Cold brew, or cold press, is coffee grounds steeped in water at cold or room temperature for an extended period.'
        },
        {
            type: 'Macchiato',
            image: 'https://s-media-cache-ak0.pinimg.com/564x/99/94/fe/9994fedb8db160d363719f2acb74acb4.jpg',
            description: 'Macchiato, meaning "stained", is an espresso with a dash of foamed milk. At first sight it resembles a small cappuccino, but even if the ingredients are the same as those used for cappuccino, a macchiato has a much stronger and aromatic taste.'
        },
        {
            type: 'Chai Latte',
            image: 'https://s-media-cache-ak0.pinimg.com/564x/99/94/fe/9994fedb8db160d363719f2acb74acb4.jpg',
            description: 'Numerous houses use the term chai latte to indicate that the steamed milk of a normal caffè latte is being flavoured with a spiced tea concentrate instead of with espresso.'
        },
        {
            type: 'Mochaccino',
            image: 'https://s-media-cache-ak0.pinimg.com/564x/99/94/fe/9994fedb8db160d363719f2acb74acb4.jpg',
            description: 'Single shot poured over heaped teaspoon of hot chocolate powder and stirred. Top with velvety milk in a cappuccino style.'
        },
    ]


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('coffee').del()
    .then(function () {
      return knex('coffee').insert(coffees)
      // return Promise.all([
      //   // Inserts seed entries
      //   knex('coffee').insert({type:'short black', image: '', description: 'rowValue1'}),
      //   knex('coffee').insert({type:'long black', image: '', description: 'rowValue2'}),
      //   knex('coffee').insert({type:'flat white', image: '', description: 'rowValue3'}),
      //   knex('coffee').insert({type:'americano', image: '', description: 'rowValue3'}),
      //   knex('coffee').insert({type:'espresso', image: '', description: 'rowValue3'}),
      //   knex('coffee').insert({type:'macchiato', image: '', description: 'rowValue3'}),
      //   knex('coffee').insert({type:'cappuccino', image: '', description: 'rowValue3'}),
      //   knex('coffee').insert({type:'mochaccino', image: '', description: 'rowValue3'})
      // ]);
    });
};
