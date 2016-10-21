'use strict';
const db = require('../../../data');
const service = require('feathers-knex');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const options = {
    Model: db,
    name: 'dumb-order',
    paginate: {
      default: 20,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/dumb-orders', service(options));

  // Get our initialize service to that we can bind hooks
  const dumb_orderService = app.service('/dumb-orders');

  // Set up our before hooks
  dumb_orderService.before(hooks.before);

  // Set up our after hooks
  dumb_orderService.after(hooks.after);
};
