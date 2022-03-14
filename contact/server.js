const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

const cors = require('cors')

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());

const routes = require('./routes');
app.use('/api', routes.router);

app.listen(port);