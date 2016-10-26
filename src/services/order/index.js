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
    console.log('data', data);
    data.details.new_date = new Date()
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
