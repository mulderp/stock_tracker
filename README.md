# Small database to track stocks

This project uses the Yahoo Finance API to get some parameters of a stock and stores it in the database.

# Install

You need to install the node modules (db connection, ORM, express, ... ) with:

    $ npm install

# Usage

First, run the latest migrations on the SQLite database:
  
    $ knex migrate:latest

Then, add stock symbols by editing the `add_stock.js` script. Then run it:

    $ node scripts/add_stock.js

Add stock to fetch from the Yahoo API:

    $ node scripts/add_snapshots.js

To see the stock snapshots, run:

    $ node scripts/report_stocks.js

# License

2016 (c) Patrick Mulder, MIT License

