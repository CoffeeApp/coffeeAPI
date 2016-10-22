'use strict';

const service = require('feathers-knex');
const hooks = require('./hooks');
const Order = require('../../../data/model/Order')
class Service {
  constructor(options) {
    this.options = options || {};
  }

  find(params) {
    console.log("THIS IS PARAMS", params)
    return Order.where('id', 1).fetch({withRelated: ['shop']})
    // db('shop').select().then(shops => {
    //   log
    // })
    // return db('shop').select()
  }

  // get(id, params) {
  //   return Promise.resolve({
  //     id, text: `A new message with ID: ${id}!`
  //   });
  // }
  //
  // create(data, params) {
  //   if(Array.isArray(data)) {
  //     return Promise.all(data.map(current => this.create(current)));
  //   }
  //
  //   return Promise.resolve(data);
  // }
  //
  // update(id, data, params) {
  //   return Promise.resolve(data);
  // }
  //
  // patch(id, data, params) {
  //   return Promise.resolve(data);
  // }
  //
  // remove(id, params) {
  //   return Promise.resolve({ id });
  // }
}
module.exports = function(){
  const app = this;

  // Initialize our service with any options it requires
  app.use('/orders', new Service());

  // Get our initialize service to that we can bind hooks
  const orderService = app.service('/orders');

  // Set up our before hooks
  orderService.before(hooks.before);

  // Set up our after hooks
  orderService.after(hooks.after);
};
