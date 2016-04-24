// connect with db
var bookshelf = require('./config');
var Stock = require('./models/stock');

var intc = Stock.forge({name: 'Intel', symbol: 'INTC'});
  intc.save()
  // add more stocks...
  // .then(function() {
  //   return Stock.forge({name: '...', symbol: '...'}).save()
  // })
  .then(function() {
    return bookshelf.knex.destroy();
  });
