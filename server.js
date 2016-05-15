// server.js
var express = require('express');
var bodyParser = require('body-parser');
var ecstatic = require('ecstatic');
var morgan = require('morgan')('combined');

// connect with db
var bookshelf = require('./config');
var Stock = require('./models/stock');
var port = 4000;
var app = express();
app.use(morgan);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ecstatic({ root: __dirname + '/static' }));

// basic routes
app.get('/', function(req, res) {
  res.writeHead(200);
  res.write('server is running');
  res.end();
});

// snapshots
app.get('/stocks/:stock_id', function(req, res) {
  res.writeHead(200);
  var stock = new Stock({id: req.params.stock_id});
  stock.fetch({
    withRelated: ['snapshots']
  })
  .then(function(model) {
    var stock = model.toJSON();
    var related = model.related('snapshots');
    return {
              stock: model.get('name'), 
              symbol: model.get('symbol'),
              snapshots: related.map(function(m) {
                return m.pick('price', 'volume', 'created_at') })
           }
  })
  .then(function(results) {
    res.write(JSON.stringify(results, null, ' '));
    res.end();
  })
  .catch(function(e) {
    console.log(e);
    res.write('problem');
    res.end();
  });
});

app.get('/stocks', function(req, res) {
  Stock.fetchAll().then(function(s) { 
    var stocks = [];
    s.forEach(function(m) {
      stocks.push({id: m.get('id'), name: m.get('name')});
    });
    res.writeHead(200);
    res.write(JSON.stringify(stocks));
    res.end();
  })
});

app.listen(port);
