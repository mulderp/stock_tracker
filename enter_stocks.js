// connect with db
var bookshelf = require('./config');
var Stock = require('./models/stock');

var stock = Stock.forge({name: 'Intel', symbol: 'INTC'});
stock.save().
  then(function() {
    return bookshelf.knex.destroy();
});
