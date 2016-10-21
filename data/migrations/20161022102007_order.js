
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('order', table => {
    table.increments('id').primary()
    table.string('name')
    table.string('phone')
    table.string('status')
    table.integer('shop_id')
    table.string('comment')
    table.date('new_date')
    table.date('submit_date')
    table.date('start_date')
    table.date('ready_date')
    table.date('delivery_date')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('order')
};
