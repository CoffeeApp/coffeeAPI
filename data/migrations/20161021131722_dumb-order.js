
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('dumb-order', table => {
    table.increments('id').primary()
    table.string('name')
    table.string('phone')
    table.string('comment')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('dumb-order')
};
