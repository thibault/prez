casper.test.begin('Hotel creation', function suite(test) {

    var hotels;

    casper.start('file:///home/thibault/prez/quality/example/index.html', function() {
        hotels = this.evaluate(function() {
            return allHotels;
        });

        test.assertEquals(hotels.length, 0, 'The hotel list is empty');
    });

    casper.then(function() {
        this.fill('form[id=hotel-form]', {
            name: 'test hotel',
            price: '5'
        }, true);
    });

    casper.then(function() {
        hotels = this.evaluate(function() {
            return allHotels;
        });

        test.assertEquals(hotels.length, 1, 'The hotel was added to the list');
        test.assertEquals(hotels[0].name, 'test hotel', 'The hotel was created successfully');
    });

    casper.then(function() {
        this.fill('form[id=hotel-form]', {
            name: 'test hotel 2',
            price: '25'
        }, true);

        this.fill('form[id=hotel-form]', {
            name: 'test hotel 3',
            price: '55'
        }, true);
        this.fill('form[id=hotel-form]', {
            name: 'test hotel 4',
            price: '66'
        }, true);
    });

    casper.then(function() {
        hotels = this.evaluate(function() {
            return allHotels;
        });

        test.assertEquals(hotels.length, 4, 'All the hotel were created');
    });

    casper.run(function() {
        test.done();
    });
});
