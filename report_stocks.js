var bookshelf = require('./config');

var Stock = require('./models/stock');
var Promise = require("bluebird");

Stock.collection().fetch({
  withRelated: ['snapshots']
})
.then(function(collection) {
    return collection.mapThen(function(model) {
      return model.toJSON();
    })
})
.then(function(results) {
  console.log(results);
})
.finally(function(r) {
  return bookshelf.knex.destroy();
})
.catch(function(e) {
  console.log(e);
});
