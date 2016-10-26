'use strict';

const service = require('feathers-knex');
const hooks = require('./hooks');
const knex = require('../../../data/index')
const orderHelper = require('../../../data/helper/order')
const _ = require('lodash')
class Service {
  constructor(options) {
    this.options = options || {};
  }

  find(params) {
    var query =  params.query;

    console.log('refactored query: ', query);

    return orderHelper.findOrder(query)
      .then(orders => {
        if(_.isEmpty(orders)) {
          return []
        } else {
          return orderHelper.getOrderDetails(orders)
        }
      })
  }

  create(data, params) {
    console.log('refactored create order data', data);

    return orderHelper.createOrder(data)
      .then(d => {
        return orderHelper.getshopsQuotes(d)
      })

  }

  patch(id, data, params) {
    console.log('patching orderid: data', id, data);

    return knex('order')
      .update(data)
      .where('id', id)
      .then((updated) => {
          console.log('patched: ', id);
          return this.find({query: {order_id: id}})
            .then(order => {
              return Promise.resolve({order:order })
            })
      })
  }
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
