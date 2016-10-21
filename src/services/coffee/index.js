'use strict';

const db = require('../../../data');
const service = require('feathers-knex');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const options = {
    Model: db,
      name: 'coffee',
    paginate: {
      default: 20,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/coffees', service(options));

  // Get our initialize service to that we can bind hooks
  const coffeeService = app.service('/coffees');

  // Set up our before hooks
  coffeeService.before(hooks.before);

  // Set up our after hooks
  coffeeService.after(hooks.after);
};
