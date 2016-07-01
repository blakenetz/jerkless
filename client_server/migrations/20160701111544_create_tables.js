exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('locations', function(table){
    table.increments('location_id');
    table.integer('latitude');
    table.integer('longitude');
  })
  .createTable('routes', function(table){
    table.increments('route_id');
    table.integer('location_start').references('locations.location_id').onDelete('cascade').onUpdate('cascade');
    table.integer('location_end').references('locations.location_id').onDelete('cascade').onUpdate('cascade');
    table.integer('jerk_value');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTable('routes')
  .dropTable('locations')
};
