'use strict';

const db = require('../../../data');
const service = require('feathers-knex');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const options = {
    Model: db,
    name: 'shop',
    paginate: {
      default: 20,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/shops', service(options));

  // Get our initialize service to that we can bind hooks
  const shopService = app.service('/shops');

  // Set up our before hooks
  shopService.before(hooks.before);

  // Set up our after hooks
  shopService.after(hooks.after);
};
