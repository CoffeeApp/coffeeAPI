
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('shop_order', table => {
    table.integer('shop_id').references('shop.id')
    table.integer('order_id').references('order.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('shop_order')
};
