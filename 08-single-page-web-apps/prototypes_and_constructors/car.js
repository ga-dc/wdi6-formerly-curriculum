/////////////////////////////////////////////
// Plain javascript object
/////////////////////////////////////////////

var celica = {
  model: 'Toy-Yoda Celica',
  color: 'limegreen',
  fuel: 100,
  drive: function() {
    this.fuel--;
    return 'Vroom!';
  },
  refuel: function() {
    this.fuel = 100;
  }
}

/////////////////////////////////////////////
// Manual factory
/////////////////////////////////////////////

function makeCar(model, color) {
  car = {};
  car.model = model;
  car.color = color;
  car.fuel = 100;
  car.drive = function() {
    this.fuel--;
    return 'Vroom!';
  };
  car.refuel = function() {
    this.fuel = 100;
  }
}

/////////////////////////////////////////////
// Constructor function without prototype
/////////////////////////////////////////////

var Car = function(model, color) {
  this.model = model;
  this.color = color;
  this.fuel = 100;
  this.drive = function() {
    this.fuel--;
    return 'Vroom!';
  };
  this.refuel = function() {
    this.fuel = 100;
  }
}

/////////////////////////////////////////////
// Constructor function with prototype
/////////////////////////////////////////////

var Car = function(model, color) {
  this.model = model;
  this.color = color;
  this.fuel = 100;
}

Car.prototype.drive = function() {
  this.fuel--;
  return 'Vroom!';
};

Car.prototype.refuel = function() {
  this.fuel = 100;
}
