exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('routes', function(table){
    table.increments('id');
    table.json('route_details');
    table.boolean('mtn_bike');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTable('routes');
};
