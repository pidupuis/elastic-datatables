(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('jQuery#elastic_datatables', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is chainable', function() {
    expect(1);
    // Not a bad test to run on collection methods.
    strictEqual(this.elems.elastic_datatables(), this.elems, 'should be chainable');
  });

  test('is awesome', function() {
    expect(1);
    strictEqual(this.elems.elastic_datatables().text(), 'awesome0awesome1awesome2', 'should be awesome');
  });

  module('jQuery.elastic_datatables');

  test('is awesome', function() {
    expect(2);
    strictEqual($.elastic_datatables(), 'awesome.', 'should be awesome');
    strictEqual($.elastic_datatables({punctuation: '!'}), 'awesome!', 'should be thoroughly awesome');
  });

  module(':elastic_datatables selector', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is awesome', function() {
    expect(1);
    // Use deepEqual & .get() when comparing jQuery objects.
    deepEqual(this.elems.filter(':elastic_datatables').get(), this.elems.last().get(), 'knows awesome when it sees it');
  });

}(jQuery));
