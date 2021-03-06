'use strict';

const service = require('feathers-knex');
const hooks = require('./hooks');
const knex = require('../../../data/index')
const _ = require('lodash')
const moment = require('moment')

class Service {
  constructor(options) {
    this.options = options || {};
  }

  /**
   * find() returns a Promise with payload of coffee orders
   * based on the passed-in query object {status, phoneNumber [, shop_id [, order_id]]}
   */
  find(params) {
    var query =  params.query;
    console.log('query: ', query);

    // the promise which will be return
    const promise = new Promise(function(resolve, reject) {
      knex('order')
      .join('shop', 'shop.id', 'order.shop_id')
      .where(function() {
        if(query && query.notIn) {
          this.whereNotIn('order.status', query.notIn)
        }
      })
      .andWhere(function() {
        if(query && query.phone) {
          this.where('order.phone', query.phone)
        }
      })
      .andWhere(function() {
        if(query) {
          if(query.shop_id) {
            if(query.order_id) {
              this.where('shop.id', query.shop_id).andWhere('order.id', query.order_id)
            } else {
              this.where('shop.id', query.shop_id)
            }
          } else if(query.order_id) {
            this.where('order.id', query.order_id)
          }
        }
      })
      .select(
        'order.id as order_id',
        'shop.id as shop_id',
        'shop.name as shop_name',
        'order.name',
        'order.phone',
        'status',
        'comment',
        'ready_time',
        'new_date as ordered'
      )

      // orders are fetched from DB and passed-in when calling knex.select.then()
      .then(orders => {
        if(_.isEmpty(orders)) {
          resolve([])
        } else {

          // for each order, get order detail from DB and wrapping in Promise object
          var promiseArray = _.map(orders, (order) => {
            return new Promise((rsv, rej) => {
              knex('order_detail')
                .join('coffee', 'order_detail.coffee_id', 'coffee.id')
                .andWhere('order_detail.order_id', order.order_id)
                .select('type', 'quantity', 'milk', 'sugar', 'note')
                .then(coffees => {
                  order.coffees = coffees
                  rsv(order)
                })
            })
          })

          // Using promise.all to synchronise all the orders' asynchronous DB operations
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
    data.details.new_date = new Date()
    console.log('ordered date', moment(data.details.new_date).format('h:mm a, MMMM Do YYYY'));
    var promise = new Promise(function(resolve, reject) {
      knex('order')
        .insert(data.details)
        .returning('id')
        .then(newOrderId => {
          console.log('newOrderId after create order: ', newOrderId);
          var promiseArray = data.orderCoffees.map(coffeeOrder => {
            coffeeOrder.order_id = newOrderId[0]
            delete coffeeOrder['type']
            delete coffeeOrder['id']
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
        console.log('data passed to shops quotes: ', data);
        var orderId = data.newOrderId
        var orderData = data.orderData
        var coffeeIds = orderData.orderCoffees.map(c => {
          return c.coffee_id
        })
        knex('shop')
          .select('id as shop_id', 'name as shop_name', 'image', 'website', 'address',
          'phone as shop_phone', 'rating', 'lat', 'lng', 'description')
          .then(shops => {
            // console.log('shops', shops);
            var shopWithTotalPromiseArray = shops.map(shop => {
              return new Promise(function(rsl, rej) {
                knex('shop_coffee')
                  .whereIn('coffee_id', coffeeIds)
                  .andWhere('shop_id', shop.shop_id)
                  .select()
                  .then(prices => {
                    console.log(`prices of ${shop.shop_name}`, prices);
                    if(prices.length >= orderData.orderCoffees.length) {
                      var total = orderData.orderCoffees.reduce((sumPrice, c) => {
                        var priceOfCoffee = prices.filter(p => {
                          return p.coffee_id == c.coffee_id
                        })[0]['price']
                        return (sumPrice + (c.quantity * priceOfCoffee))
                      }, 0)
                      shop.total = total
                    } else {
                      var coffeesNotAvailable = orderData.orderCoffees.filter((orderCoffee) => {
                        var isAvailable = prices.reduce((hasPriceInfo, price) => {
                          return hasPriceInfo || price.coffee_id == orderCoffee.coffee_id
                        }, false)
                        return !isAvailable
                      })
                      shop.coffeesNotAvailable = coffeesNotAvailable.map(c => c.coffee_id)
                    }
                    shop.order_id = orderId
                    shop.status = ""
                    rsl(shop)
                  })
              })
            })

            return Promise.all(shopWithTotalPromiseArray)

          }).then(shopsMayHaveNoTotal => {
            var shopsWithTotal = shopsMayHaveNoTotal.filter(shop => {
              return !(_.isNil(shop.total))
            })
            console.log(shopsWithTotal[0]);
            resolve(shopsWithTotal)
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
    console.log('patching orderid: data', id, data);
    return new Promise((resolve, reject) => {
      knex('order')
          .update(data)
          .where('id', id)
          .then((updated) => {
              console.log('patched: ', id);
              return this.find({query: {order_id: id}})
                .then(order => {
                  resolve({order:order })
                })
          })
    })

  }
  patchs(id, data, params) {
    knex('order')
      .update(data)
      .where('id', id)
      .then((id) => {

      })
    return
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
