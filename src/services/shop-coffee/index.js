'use strict';

const hooks = require('./hooks');
const Shop = require('../../../data/model/Shop')
const Coffee = require('../../../data/model/Coffee')

class Service {
  constructor(options) {
    this.options = options || {};
  }

  find(params) {
    console.log("THIS IS PARAMS", params)
    return Shop.where('id', 1).fetch({withRelated: ['coffees']})
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
  app.use('/shop-coffees', new Service());

  // Get our initialize service to that we can bind hooks
  const findJobsByTermervice = app.service('/shop-coffees');

  // Set up our before hooks
  findJobsByTermervice.before(hooks.before);

  // Set up our after hooks
  findJobsByTermervice.after(hooks.after);
};

module.exports.Service = Service;

//
// where: (query, callback) => {
//   db('jobs')
//   .join('terms', 'jobs.url', '=', 'terms.job_url')
//   .select()
//   .where(query)
//   .asCallback(callback)
// },
