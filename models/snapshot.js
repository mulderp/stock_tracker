// load the database config 
var bookshelf = require('../config');
var Stock = require('./stock');

var Snapshot = bookshelf.Model.extend({
   tableName: 'snapshots',
   hasTimestamps: true,

   stock: function() {
     return this.belongsTo(Stock);
   }
});
module.exports = bookshelf.model('Snapshot', Snapshot);
