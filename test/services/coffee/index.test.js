'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('coffee service', function() {
  it('registered the coffees service', () => {
    assert.ok(app.service('coffees'));
  });
});
