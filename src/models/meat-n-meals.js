/* Meat and Meals */

function SeatReservation(name, meal) {

    var self = this;
    self.name = ko.observable(name);
    self.meal = ko.observable(meal);

    self.print = function() {
        return "SeatReservation: name = " + self.name() + ", meal = " + self.meal();
    };
    
    self.formattedPrice = ko.computed(function() {
        return "$" + (self.meal().price() > 0 ? parseFloat(self.meal().price()).toFixed(2) : ", free");
    });
}

function Meal(name, price) {

    var self = this;
    self.name = ko.observable(name);
    self.price = ko.observable(price);

    self.print = function() {
        return "Meal: name = " + self.name() + " for " + self.price();
    };
}

function SeatReservationViewModel() {

    var self = this;

    self.setAvailableMeals = function(availableMeals) {
        self.availableMeals = availableMeals;
    };

    self.setSeats = function(seats) {
        self.seats = ko.observableArray(seats);
    };

    self.seats = ko.observableArray([]);

    self.timer = ko.observable(new Date().toGMTString());
    
    self.addSeat = function() {
        self.seats.push(new SeatReservation("", new Meal("", 0)));
    };
    
    self.removeSeat = function(seat) {
        self.seats.remove(seat);
    };
}

var seatReservationViewModel = new SeatReservationViewModel();
var availableMeals = [
    new Meal("Ceaser", 5.95),
    new Meal("Beef", 9.50),
    new Meal("Fish cut-offs", 6.60),
    new Meal("Mushed vegetables", 4.25),
    new Meal("Vegatrian mix-ins", 12.5),
    new Meal("Standart Meal", 0.0)
];
var seats = [
    new SeatReservation("Daniel Craig", availableMeals[0]),
    new SeatReservation("Angelina Jolie", availableMeals[1]),
    new SeatReservation("Brad Pitt", availableMeals[2]),
    new SeatReservation("Calvin Harris", availableMeals[3]),
    new SeatReservation("Kanye West", availableMeals[4])
];

seatReservationViewModel.setAvailableMeals(availableMeals);
seatReservationViewModel.setSeats(seats);

ko.applyBindings(seatReservationViewModel);

function updatePrices(seats) {
    return function() {
        for (i = 0; i < seats.length; i++) {
            seats[i].meal().price((seats[i].meal().price() * 1.02).toFixed(2));
        }
    };
}

function updateTimer(vm) {
    return function() {
        vm.timer(new Date().toGMTString());
    };
}

window.setInterval(updatePrices(seatReservationViewModel.seats()), 1000);
window.setInterval(updateTimer(seatReservationViewModel), 1000);

