
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('order_detail', table => {
    table.increments('id').primary()
    table.integer('order_id').references('order.id')
    table.integer('coffee_id').references('coffee.id')
    table.integer('quantity')
    table.string('milk')
    table.integer('sugar')
    table.string('note')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('order_detail')
};
