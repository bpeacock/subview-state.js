var sinon = require('sinon'),
    module = window.module,
    sandbox;

var testView;
module("State", {
    setup: function() {
        sandbox = sinon.sandbox.create();
        testView = testSubview.spawn();
    },
    teardown: function() {

    }
});

test("#set", function() {
    testView.state.set('foo', 'bar');

    ok(testView.$wrapper.hasClass('state-foo-bar'), "Class added");
    equal(testView.state.data.foo, 'bar', "Attribute set");
});

test("#get", function() {
    testView.state.set('foo', 'bar');
    equal(testView.state.get('foo'), 'bar', "get works");
});

test("#remove", function() {
    testView.state.set('foo', 'bar');
    testView.state.remove('foo');

    equal(testView.state.get('foo'), undefined, "removed foo");
    ok(!testView.$wrapper.hasClass('state-foo-bar'), "class removed");
});

test("#bind", function() {
    var callback = sinon.spy();
    testView.state.bind('foo', callback);
    testView.state.set('foo', 'bar');

    ok(callback.called, "Callback called");
    ok(callback.calledWith('bar'), "Correct argument passed to callback");
});

test("#unbind", function() {
    var callback = sinon.spy();
    testView.state.bind('foo', callback);
    testView.state.unbind('foo');
    testView.state.set('foo', 'bar');

    ok(!callback.called, "Callback didn't fire.");
});

test("#trigger", function() {
    var callback = sinon.spy();
    testView.state.set('foo', 'bar');
    testView.state.bind('foo', callback);
    testView.state.trigger('foo');

    ok(callback.called, "Callback called");
    ok(callback.calledWith('bar'), "Correct argument passed to callback");
});
