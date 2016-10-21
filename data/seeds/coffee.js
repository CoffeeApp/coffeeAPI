
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('coffee').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('coffee').insert({type:'short black', image: '', description: 'rowValue1'}),
        knex('coffee').insert({type:'long black', image: '', description: 'rowValue2'}),
        knex('coffee').insert({type:'flat white', image: '', description: 'rowValue3'}),
        knex('coffee').insert({type:'americano', image: '', description: 'rowValue3'}),
        knex('coffee').insert({type:'espresso', image: '', description: 'rowValue3'}),
        knex('coffee').insert({type:'macchiato', image: '', description: 'rowValue3'}),
        knex('coffee').insert({type:'cappuccino', image: '', description: 'rowValue3'}),
        knex('coffee').insert({type:'mochaccino', image: '', description: 'rowValue3'})
      ]);
    });
};
