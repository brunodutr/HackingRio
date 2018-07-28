const express = require('express');
const consign = require('consign');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

module.exports = function() {
  var app = express();

  app.use(helmet());
  app.use(morgan('dev'));
  app.use(cors());

  app.use(bodyParser.json());

  consign({ cwd: 'app' })
    .then('routes')
    .into(app);

  /*.include('utils')
    .include('models')
    .then('repositories')
    .then('controllers')
 */

  return app;
};
