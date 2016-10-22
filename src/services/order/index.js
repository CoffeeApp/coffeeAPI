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
    const promise = new Promise(function(resolve, reject) {
      knex('order')
      .join('shop', 'shop.id', 'order.shop_id')
      .select(
        'order.id as order_id',
        'shop.name as shop_id',
        'order.name',
        'order.phone',
        'status',
        'comment',
        'new_date as ordered'
      )
      .then(orders => {
        if(_.isEmpty(orders)) {
          resolve([])
        } else {
          var promiseArray = _.map(orders, (order) => {
            return new Promise((rsv, rej) => {
              knex('order_detail')
                .join('coffee', 'order_detail.coffee_id', 'coffee.id')
                .andWhere('order_detail.order_id', order.order_id)
                .select('type', 'quantity as qty', 'milk', 'sugar')
                .then(coffees => {
                  order.coffees = coffees
                  rsv(order)
                })
            })
          })
          Promise.all(promiseArray)
            .then((resultOrders) => {
              resolve(resultOrders)
            })
        }
      })

    })
    return promise
  }

  create(data, params) {
    console.log('data', data);

    var promise = new Promise(function(resolve, reject) {
      knex('order')
        .insert(data.details)
        .then(newOrderId => {
          var promiseArray = data.coffees.map(coffeeOrder => {
            coffeeOrder.order_id = newOrderId[0]
            delete coffeeOrder['type']
            return knex('order_detail')
              .insert(coffeeOrder)
          })

          return Promise.all(promiseArray)
            .then(batchAdds => {
              resolve({
                newOrderId: newOrderId[0],
                orderData: data
              })
            })
        })
    })

    var resultPromise = new Promise(function(resolve, reject) {
      promise.then(data => {
        var orderId = data.newOrderId
        var orderData = data.orderData
        var coffeeIds = orderData.coffees.map(c => {
          return c.coffee_id
        })
        knex('shop')
          .select('id as shop_id', 'name as shop_name')
          .then(shops => {
            // console.log('shops', shops);
            var shopWithToalPrimiseArray = shops.map(shop => {
              return new Promise(function(rsl, rej) {
                knex('shop_coffee')
                  .whereIn('coffee_id', coffeeIds)
                  .andWhere('shop_id', shop.shop_id)
                  .select()
                  .then(prices => {
                    // console.log(`prices of ${shop.shop_name}`, prices);
                    var total = orderData.coffees.reduce((sumPrice, c) => {
                      var priceOfCoffee = prices.filter(p => {
                        return p.coffee_id == c.coffee_id
                      })[0]['price']
                      return (sumPrice + (c.quantity * priceOfCoffee))
                    }, 0)
                    shop.total = total
                    rsl(shop)
                  })
              })
            })

            return Promise.all(shopWithToalPrimiseArray)

          }).then(shopsWithToal => {
            console.log('shopsWithToal', shopsWithToal);
            resolve(shopsWithToal)
          })
      })
    })
    return resultPromise
  }
  //
  // update(id, data, params) {
  //   return Promise.resolve(data);
  // }
  //
  patch(id, data, params) {
    return new Promise(function(resolve, reject) {
      knex('order')
        .update(data)
        .where('id', id)
        .then((id) => {
          resolve(`order id ${id} is patched`)
        })
    })
  }
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
