// connect with db
var bookshelf = require('./config');
var Stock = require('./models/stock');

var stock = Stock.forge({name: 'Intel', symbol: 'INTC'});
  stock.save()
  // add more stocks...
  .then(function() {
    return bookshelf.knex.destroy();
  });
