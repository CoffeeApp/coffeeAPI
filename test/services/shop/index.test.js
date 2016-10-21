'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('shop service', function() {
  it('registered the shops service', () => {
    assert.ok(app.service('shops'));
  });
});
