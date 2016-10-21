'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('dumb-order service', function() {
  it('registered the dumb-orders service', () => {
    assert.ok(app.service('dumb-orders'));
  });
});
