// load the database config 
var bookshelf = require('../config');
var Stock = require('./stock');

var Snapshot = bookshelf.Model.extend({
   tableName: 'snapshots',

   snapshots: function() {
     return this.belongsTo('Stock');
   }
});
module.exports = bookshelf.model('Snapshot', Snapshot);
