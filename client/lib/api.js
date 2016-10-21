const feathers = require('feathers-client')
const io = require('socket.io-client')

// Establish a Socket.io connection
const socket = io('http://localhost:3030/');
// Initialize our Feathers client application through Socket.io
// with hooks and authentication.
const api = feathers()
.configure(feathers.socketio(socket))
.configure(feathers.hooks())
// Use localStorage to store our login token
.configure(feathers.authentication({
  storage: window.localStorage
}));

module.exports = api
