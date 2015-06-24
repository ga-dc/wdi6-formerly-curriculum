# Hogwarts.js

The teachers are getting frustrated at managing house points, and this magic thing just isn't cutting it. Let's use some JavaScript magic to help them out.

Create an object-oriented JavaScript application with three constructor functions: `Student`, `House`, and `School`.

**Requirements:**

1. Create a new HTML document, and include a `hogwarts.js` file. Feel free to include Underscore.
 
2. Start by building the smallest object unit (Student) and work your way up to the largest (School).

3. Stay DRY. If you write an action twice, then you can probably consolidate it.

4. Augment the prototypes of each constructor with the following properties/methods:


## Student

* `name`: specifies the name of the student.
* `points`: specifies the number of points the student has earned (zero by default).
* `awardPoints(points)`: adds the specified number of points to the student's current points total.

**Example Usage:**

```
var harry = new Student('Harry Potter');
harry.awardPoints(10);
```

## House

* `addStudent(name)`: adds a new Student object with the specified name into the house, and returns it.
* `getStudent(name)`: finds and returns a student object with the specified name, or null if they're not defined within the house.
* `getOrAddStudent(name)`: finds and returns a student object with the specified name, or adds and returns the student if they didn't already exist.
* `awardPointsTo(name, points)`: finds a student with the specified name, and awards them the specified number of points. Add the student to the house if they weren't already there.
* `getTotalPoints()`: tallies all points currently earned among all students in the house.

**Example Usage:**

```
var gryffindor = new House('Gryffindor');

gryffindor.addStudent('Harry Potter');
gryffindor.awardPointsTo('Hermionie Granger', 20);

var totalPoints = gryffindor.getTotalPoints();
```

## School

* `addHouse(name)`: adds a new House object with the specified name into the school, and returns it.
* `addHouses(name, …)`: adds a new House object for each house name provided as an argument.
* `getHouse(name)`: finds and returns a house with the specified name, or null if the house is not defined.
* `getLeadingHouses()`: finds and returns an array of all houses with the highest point totals.

**Example Usage:**

```
var hogwarts = new School('Hogwarts');

hogwarts.addHouse('Gryffindor');
hogwarts.addHouses('Ravenclaw', 'Hufflepuff','Slytherin');

var ravenclaw = hogwarts.getHouse('Ravenclaw');
var leaders = hogwarts.getLeadingHouses();
```