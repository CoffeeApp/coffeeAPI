
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('shop_coffee', table => {
    table.integer('shop_id').references('shop.id')
    table.integer('coffee_id').references('coffee.id')
    table.float('price')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('shop_coffee')
};
