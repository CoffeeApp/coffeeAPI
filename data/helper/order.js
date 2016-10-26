const knex = require('../index')
const _ = require('lodash')
module.exports = {
  findOrder,
  getOrderDetails,
  createOrder,
  getshopsQuotes
}

function getShops() {
  return knex('shop')
    .select('id as shop_id', 'name as shop_name', 'image', 'website', 'address',
    'phone as shop_phone', 'rating', 'lat', 'lng', 'description')
}

function getCoffeesPricesForShop(coffeeIds, shop) {
  return knex('shop_coffee')
    .whereIn('coffee_id', coffeeIds)
    .andWhere('shop_id', shop.shop_id)
    .select()
}
function countTotalPrice(coffees, prices) {
  return coffees.reduce((sumPrice, c) => {

    var priceOfCoffee = prices.filter(p => {
      return p.coffee_id == c.coffee_id
    })[0]['price']

    return (sumPrice + (c.quantity * priceOfCoffee))
  }, 0)
}
function getNotAvailableCoffeeIds(coffeesInOrder, prices) {
  var coffeesNotAvailable = coffeesInOrder.filter((orderCoffee) => {

    var isAvailable = prices.reduce((hasPriceInfo, price) => {
      return hasPriceInfo || price.coffee_id == orderCoffee.coffee_id
    }, false)

    return !isAvailable
  })

  return coffeesNotAvailable.map(c => c.coffee_id)
}
function getSingleShopQuote(coffeeIds, shop, coffeesInOrder, orderId) {
  return getCoffeesPricesForShop(coffeeIds, shop)
    .then(prices => {
      console.log(`prices of ${shop.shop_name}`, prices);

      if(prices.length >= coffeesInOrder.length) {
        shop.total = countTotalPrice(coffeesInOrder, prices)
      } else {
        shop.coffeesNotAvailable = getNotAvailableCoffeeIds(coffeesInOrder, prices)
      }

      shop.order_id = orderId
      shop.status = ""

      return Promise.resolve(shop)
    })
}
function getshopsQuoteOrMissedCoffeeIds(data) {

      console.log('refactored shops quotes: ', data);
      var orderId = data.newOrderId
      var coffeesInOrder = data.orderData.orderCoffees

      var coffeeIds = coffeesInOrder.map(c => {
        return c.coffee_id
      })

      return getShops().then(shops => {

        var shopWithTotalPromiseArray = shops.map(shop => {
          return getSingleShopQuote(coffeeIds, shop, coffeesInOrder, orderId)
        })

        return Promise.all(shopWithTotalPromiseArray)
      })
}
function getshopsQuotes(data) {
  return getshopsQuoteOrMissedCoffeeIds(data)
    .then(shopsMayHaveNoTotal => {

      var shopsWithTotal = shopsMayHaveNoTotal.filter(shop => {
        return !(_.isNil(shop.total))
      })

      console.log(shopsWithTotal[0]);

      return Promise.resolve(shopsWithTotal)
    })
}

function createOrder(data) {
  data.details.new_date = new Date()

  return knex('order')
    .insert(data.details)
    .returning('id')
    .then(newOrderId => {
      console.log('newOrderId after create order: ', newOrderId);
      return createOrderDetails(newOrderId, data)
        .then(() => {
          return Promise.resolve({
            newOrderId: newOrderId[0],
            orderData: data
          })
        })
    })

}
function createOrderDetails(newOrderId, data) {
  var promiseArray = data.orderCoffees.map(coffeeOrder => {

    coffeeOrder.order_id = newOrderId[0]
    delete coffeeOrder['type']
    delete coffeeOrder['id']

    return knex('order_detail')
      .insert(coffeeOrder)
  })

  return Promise.all(promiseArray)
}
function getOrderDetails(orders) {
  var promiseArray = _.map(orders, (order) => {
    return getOrderDetail(order)
  })

  return Promise.all(promiseArray)
}
function getOrderDetail(order) {
  return knex('order_detail')
    .join('coffee', 'order_detail.coffee_id', 'coffee.id')
    .andWhere('order_detail.order_id', order.order_id)
    .select('type', 'quantity', 'milk', 'sugar', 'note')
    .then(coffees => {
      order.coffees = coffees
      return Promise.resolve(order)
    })
}
function findOrder(query) {
  return knex('order')
    .join('shop', 'shop.id', 'order.shop_id')
    .where(function() {
      if(query && query.notIn == 'new') {
        this.whereNot('order.status', query.notIn)
      }
    })
    .andWhere(function() {
      if(query && query.phone) {
        this.where('order.phone', query.phone)
      }
    })
    .andWhere(function() {
      if(query && query.shop_id) {
        this.where('shop.id', query.shop_id)
      }
    })
    .andWhere(function() {
      if(query && query.order_id) {
        this.where('order.id', query.order_id)
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
}
