function table(t) {

   t.increments('id')
    .primary();
   t.integer('stock_id')
    .references('id')
    .inTable('stocks');
   t.float('price');
   t.string('marketCap');
   t.string('ebitda');
   t.float('eps');
   t.float('dividenPerShare');
   t.float('volume');
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
               .dropTable('snapshots', table)
               .then(function () {
                  console.log('snapshots table was dropped!');
                });
};
