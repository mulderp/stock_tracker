var yahooFinance = require('yahoo-finance');
var _ = require('underscore');

// connect with db
var bookshelf = require('./config');
var Promise = require('bluebird');
var Stock = require('./models/stock');
var Snapshot = require('./models/snapshot');

console.log('fetch data');
fetchSnapshot(['INTC'])

function fetchSnapshot(symbols) {
  var result = yahooFinance.snapshot({
    symbols: symbols,
    fields: ['y', 'd', 'j1', 'j4', 'e', 's6', 'e7', 'v', 's', 'l1', 'n', 's6']},
      function(err, data) {
        console.log('results');
        console.log(err);
        console.log(data);

        Promise.map(data, function(d) {
          return saveSnapshot(d)
        })
        .finally(function() {
          return bookshelf.knex.destroy();
        });
     });
}

// save data
function saveSnapshot(data) {
  var stock = Stock.collection().fetch({symbol: data.symbol}).then(function(models) {
    return models.findWhere({symbol: data.symbol}).get('id');
  })
  .then(function(id) {
    return Snapshot.forge({stock_id: id,
                          price: data.lastTradePriceOnly,
                          eps: data.earningsPerShare,
                          ebitda: data.ebitda,
                          marketCap: data.marketCap,
                          volume: data.volume
    })
  })
  .then(function(m) {
    return m.save();
  })
  return stock;
};
