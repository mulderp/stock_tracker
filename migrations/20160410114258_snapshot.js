function table(t) {

   t.increments().primary();
   t.integer('stock_id').references('stocks.id');
   t.float('price');
   t.timestamps();

}


exports.up = function(knex, Promise) {
   return knex.schema
              .createTable('snapshots', table)
              .then(function () {
                 console.log('snapshots table is created!');
               });
};

exports.down = function(knex, Promise) {
   return knex.schema
               .dropTable('weather_events', table)
               .then(function () {
                  console.log('snapshots table was dropped!');
                });
};
