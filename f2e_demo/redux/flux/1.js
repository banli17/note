const Dispatcher = require('./dispatcher')

var flightDispatcher = new Dispatcher()

var CountryStore = { country: null }
var CityStore = { city: null }
var FlightPriceStore = { price: null }

var a = flightDispatcher.register(function (payload) {
    console.log('ggg');
})

flightDispatcher.register(function (payload) {
    flightDispatcher.waitFor([a])
    console.log(payload);

    if (payload.actionType == 'city-update') {
        CityStore.city = payload.selectedCity
    }
})

flightDispatcher.dispatch({
    actionType: 'city-update',
    selectedCity: 'paris'
})
