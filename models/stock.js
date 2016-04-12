// load the database config 
var bookshelf = require('../config');
var Snapshot = require('./snapshot');

var Stock = bookshelf.Model.extend({
   tableName: 'stocks',
   hasTimestamps: true,

   snapshots: function() {
     return this.hasMany('Snapshot');
   }
});
module.exports = bookshelf.model('Stock', Stock);
