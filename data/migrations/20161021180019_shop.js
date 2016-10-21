
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('shop', table => {
    table.increments('id').primary()
    table.string('name')
    table.string('image')
    table.string('address')
    table.string('phone')
    table.string('rating')
    table.string('lat')
    table.string('lng')
    table.string('description')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('shop')
};
