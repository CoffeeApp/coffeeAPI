'use strict';

const service = require('feathers-knex');
const hooks = require('./hooks');
const knex = require('../../../data/index')
const _ = require('lodash')
class Service {
  constructor(options) {
    this.options = options || {};
  }
  find(params) {
    console.log("THIS IS PARAMS", params)
    const promise = new Promise(function(resolve, reject) {
      knex('order')
      .select(
        'id',
        'name',
        'phone',
        'status',
        'comment',
        'submit_date'
      )
      .then(orders => {
        if(_.isEmpty(orders)) {
          resolve([])
        } else {
          var promiseArray = _.map(orders, (order) => {
            return new Promise((rsv, rej) => {
              knex('order_detail')
                .join('coffee', 'order_detail.coffee_id', 'coffee.id')
                .andWhere('order_detail.order_id', order.id)
                .select('type', 'quantity', 'milk', 'sugar', 'order_id')
                .then(coffees => {
                  order.coffees = coffees
                  rsv(order)
                })
            })
          })
          Promise.all(promiseArray)
            .then((resultOrders) => {
              console.log(resultOrders);
              resolve(resultOrders)
            })
        }
      })

    })
    return promise
  }
  // find(params) {
  //   console.log("THIS IS PARAMS", params)
  //   const promise = new Promise(function(resole, reject) {
  //     knex('order as o')
  //       .join('order_detail as od')
  //       .join('coffee as cf')
  //       .where(knex.raw('o.id = od.order_id and od.coffee_id = cf.id'))
  //       .select(
          // 'o.name',
          // 'o.phone',
          // 'o.status',
          // 'o.comment',
          // 'o.submit_date',
  //         'cf.type',
  //         'od.quantity',
  //         'od.milk',
  //         'od.sugar'
  //       ).then(result => {
  //         if(!result || result.length == 0) {
  //           resole([])
  //         } else {
  //           console.log(result);
  //           var coffees = result.reduce((prev, curv) => {
  //             var curOrder = {}
  //             curOrder.name = curv.name
  //             curOrder.phone = curv.phone
  //             curOrder.status = curv.status
  //             curOrder.comment = curv.comment
  //             curOrder.submit_date = curv.submit_date
  //
  //
  //             coffee.type = curv.type
  //             coffee.quantity = curv.quantity
  //             coffee.milk = curv.milk
  //             coffee.sugar = curv.sugar
  //             prev.push(coffee)
  //             return prev
  //           }, [])
  //           var order = {}
  //
  //           order.coffees = coffees
  //         }
  //         resole(order)
  //       })
  //   })
  //   return promise
  // }

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
