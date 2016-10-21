
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('coffee', table => {
    table.increments('id').primary()
    table.string('type')
    table.string('image')
    table.string('description')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('coffee')
};
