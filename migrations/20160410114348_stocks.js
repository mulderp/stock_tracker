var table = function(t) {
   t.increments('id')
    .primary();
   t.string('name');
   t.string('symbol');
   t.timestamps();
}


exports.up = function(knex, Promise) {
   return knex.schema
              .createTable('stocks', table)
              .then(function () {
                 console.log('stocks table is created!');
               });
};

exports.down = function(knex, Promise) {
   return knex.schema
               .dropTable('stocks', table)
               .then(function () {
                  console.log('stocks events table was dropped!');
                });
};
