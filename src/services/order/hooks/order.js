const service = require('feathers-memory');

module.exports = function(){
  const app = this;

  let myHook = function(options) {
    return function(hook) {
      console.log('My custom hook ran!');
    }
  }

  // Initialize our service
  app.use('/order', service());

  // Get our initialize service to that we can bind hooks
  const userService = app.service('/order');

  // Set up our before hook
  hooks.iff(
  () => new Promise((resolve, reject) => { ... }),
  hooks.populate('order', { field: 'order_id', service: '/order' })
  });
}
