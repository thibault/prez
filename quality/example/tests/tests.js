var assert = require('chai').assert;
var sinon = require('sinon');

var Hotel = require('../js/app').Hotel;

describe('An Hotel', function() {

    var sandbox;

    beforeEach(function() {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function() {
        sandbox.restore();
    });

    describe('constructor', function() {
        it('should display a warning if price is unreasonnable', function() {
            var spy = sandbox.spy(console, 'warn');
            var hotel = new Hotel('Heartbreak hotel', 1);
            assert.isTrue(spy.called);
        });

        it('should display an error if price is not a number', function() {
            var spy = sandbox.spy(console, 'error');
            var hotel = new Hotel('Heartbreak hotel', 'bla');
            assert.isTrue(spy.called);
        });
    });

    it('should have a name', function() {
        var hotel = new Hotel('Heartbreak hotel');
        assert.equal(hotel.name, 'Heartbreak hotel');
    });

    it('should have a price', function() {
        var hotel = new Hotel('Heartbreak hotel', 55);
        assert.equal(hotel.price, 55);
    });

    it('should have a default price', function() {
        var hotel = new Hotel('Heartbreak hotel');
        assert.isDefined(hotel.price);
    });

    describe('isCheap', function() {
        it('should return a boolean', function() {
            var hotel = new Hotel('Heartbreak hotel');
            assert.isBoolean(hotel.isCheap());
        });
        it('should return true if price < 15');
        it('should return false if price > 15');
        it('should return true if price == 15');
    });
});
