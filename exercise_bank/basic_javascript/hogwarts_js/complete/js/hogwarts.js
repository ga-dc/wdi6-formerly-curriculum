// Student

function Student(name, points) {
  this.name = name;
  this.points = points || 0;
}

Student.prototype = {
  awardPoints: function(points) {
    this.points += points;
  }
};


// House

function House(name) {
  this.name = name;
  this.students = [];
}

House.prototype = {
  addStudent: function(name) {
    var student = new Student(name);
    this.students.push(student);
    return student;
  },

  getStudent: function(name) {
    return _.findWhere(this.students, {name: name});
  },

  getOrAddStudent: function(name) {
    return this.getStudent(name) || this.addStudent(name);
  },

  awardPointsTo: function(name, points) {
    this.getOrAddStudent(name).awardPoints(points);
  },

  getTotalPoints: function() {
    return _.reduce(this.students, function(memo, student) {
      return memo + student.points;
    }, 0);
  }
};


// School

function School(name) {
  this.name = name || '';
  this.houses = [];
}

School.prototype = {
  addHouse: function(name) {
    var house = new House(name);
    this.houses.push(house);
    return house;
  },

  addHouses: function() {
    for (var i=0; i < arguments.length; i++) {
      this.addHouse(arguments[i]);
    }
  },

  getHouse: function(name) {
    return _.findWhere(this.houses, {name: name});
  },

  getLeadingHouses: function() {
    var maxPoints = 0;

    _.each(this.houses, function(house) {
      maxPoints = Math.max(maxPoints, house.getTotalPoints());
    });

    return _.filter(this.houses, function(house) {
      return house.getTotalPoints() >= maxPoints;
    });
  }
};


// Usage:

// Create Hogwarts School:
var hogwarts = new School('Hogwarts');

// Add Gryffindor:
var gryffindor = hogwarts.addHouse('Gryffindor');

// Add all other houses:
hogwarts.addHouses('Ravenclaw', 'Hufflepuff', 'Slytherin');

// Check the names of all houses:
console.log('All Houses: ', _.pluck(hogwarts.houses, 'name'));

// Get a house:
console.log('Get Ravenclaw: ', hogwarts.getHouse('Ravenclaw'));

// Add/get a student:
var harry = gryffindor.addStudent('Harry Potter');
console.log('Get Harry: '+ gryffindor.getStudent('Harry Potter').name);

// getOrAddStudent
console.log('Get/Add Ron: '+ gryffindor.getOrAddStudent('Ron Weasley').name);
console.log('Total students in Gryffindor: ', gryffindor.students.length);

// Award points to Hermionie:
gryffindor.awardPointsTo('Harry Potter', 10);
gryffindor.awardPointsTo('Hermionie Granger', 50);
console.log('Get Hermionie points: '+ gryffindor.getStudent('Hermionie Granger').points);

// Total points for house:
console.log('Gryffindor points: ', gryffindor.getTotalPoints());

// Get leading houses:
console.log('Current house leader(s): ', _.pluck(hogwarts.getLeadingHouses(), 'name'));

hogwarts.getHouse('Hufflepuff').awardPointsTo('Cedric Diggory', 60);
console.log('New house leader(s): ', _.pluck(hogwarts.getLeadingHouses(), 'name'));