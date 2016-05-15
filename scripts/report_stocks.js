var bookshelf = require('../config');

var Stock = require('../models/stock');
var Promise = require("bluebird");

Stock.collection().fetch({
  withRelated: ['snapshots']
})
.then(function(collection) {
    return collection.mapThen(function(model) {
      var stock = model.toJSON();
      var related = model.related('snapshots');
      return {stock: model.get('name'), symbol: model.get('symbol'),
        snapshots: related.map(function(m) { return m.pick('price', 'volume') })
//        ebitda: related.pluck('ebitda')
      }
    })
})
.then(function(results) {
  console.log(JSON.stringify(results, null, '  '));
})
.finally(function(r) {
  return bookshelf.knex.destroy();
})
.catch(function(e) {
  console.log(e);
});
