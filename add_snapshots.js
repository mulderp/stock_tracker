var yahooFinance = require('yahoo-finance');
var _ = require('underscore');

// connect with db
var bookshelf = require('./config');
var Stock = require('./models/stock');
var Snapshot = require('./models/snapshot');

console.log('fetch data');

yahooFinance.snapshot({
    symbol: 'INTC',
    fields: ['y', 'd', 'j1', 'j4', 'e', 's6', 'e7', 'v', 's', 'l1', 'n', 's6']},
   function(err, data) { 
     console.log('results');
      console.log(err);
      console.log(data);

      saveSnapshot(data);
  });

// save data
function saveSnapshot(data) {
  var stock = Stock.collection().fetch({symbol: 'INTC'}).then(function(m) {
    return m.id;
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
  .finally(function() {
      return bookshelf.knex.destroy();
  });
};
