exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('routes', function(table){
    table.increments('id');
    table.decimal('latitude', 8, 5);
    table.decimal('longitude', 8, 5);
    table.decimal('jerk_value', 7, 3);
    table.integer('route_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTable('routes')
};
