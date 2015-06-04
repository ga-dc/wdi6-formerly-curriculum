describe("JavaScript Functions", function() {

  // Establish a reference to global scope (this is different between a browser and NodeJS)
  var GLOBAL = (typeof window == 'undefined') ? global : window;

  describe('arguments and return', function() {

    it('accept arguments and return values.', function() {

      function add(a, b) {
        return a + b;
      }

      expect(add(5, 10)).toEqual(15);
    });


    it('will return nothing (undefined) unless we explicitely return a value.', function() {

      function test() {
        var message = 'Hello!';
      }

      expect(test()).toBe(undefined);
    });


    it('will require us to compose our own argument defaults', function() {

      function add(a, b) {
        expect(b).toBe(undefined);
        a = a || 0;
        b = b || 0;
        expect(b).toBe(0);
        return a + b;
      }

      add(10);
    });


    it('provides an arguments *object* that contains all arguments passed into the function.', function() {

      function test() {
        expect(arguments[0]).toBe(10);
        expect(arguments[1]).toBe(20);
        expect(arguments instanceof Array).toBeFalsy();
        expect(arguments instanceof Object).toBeTruthy();
      }

      test(10, 20);
    });
  });


  describe('scope and closure', function() {

    it('allows function scopes to reference outward, but not to look inward at nested closures.', function() {

      var outer = 10;

      function test() {
        var inner = 20;
        expect(outer).toBe(10);
        expect(inner).toBe(20);
      }

      test();
      expect(outer).toBe(10);
      expect(typeof inner).toBe('undefined');
    });


    it('will override conflicting variable declarations in an inner scope. The outer scope is unaffected.', function() {

      var n = 5;

      function test() {
        var n = 20;
        expect(n).toBe(20);
      }

      test();
      expect(n).toBe(5);
    });


    it('allows inner scopes to access and modify variables declared in an outer scope.', function() {

      var n = 5;

      function test() {
        n = 20;
      }

      test();
      expect(n).toBe(20);
    });


    it('assigns all undeclared variables into global scope.', function() {

      function test() {
        n = 20;
      }

      test();
      expect(GLOBAL.n).toBe(20);
    });


    it('allows us to Immedaitely-Invoke Function Expressions (IIFE) to create a private scope for our code.', function() {

      var invoked = false;

      (function() {
        invoked = true;

        // My code goes here...

      })();

      expect(invoked).toBe(true);
    });
  });


  describe('declaration, assignment, and hoisting', function() {

    it('will hoist function declarations to the top of scope so that they can be used anywhere.', function() {

      expect(typeof test).toBe('function');
      expect(test()).toBe(1);

      // Important: keep this test function AFTER our assertions for hoisting!

      function test() {
        return 1;
      }

    });


    it('will NOT hoist function assignments to the top of scope, because that could change control flow.', function() {

      expect(typeof test).toBe('undefined');

      // Important: keep this test function AFTER our assertions for hoisting!

      var test = function() {
        return 1;
      };

    });
  });


  describe('context', function() {

    it('will bind the function invocation pattern to the global object.', function() {

      function test() {
        return this;
      }

      expect(test()).toBe(GLOBAL);
    });


    it('will bind the method invocation pattern to the host object.', function() {

      var obj = {
        test: function() {
          return this;
        }
      };

      expect( obj.test() ).toBe(obj);
    });


    it('will bind the ".call" and ".apply" invocation pattern to a passed object.', function() {

      function test(a, b) {
        expect(a).toBe(5);
        expect(b).toBe(10);
        return this;
      }

      var target = {};
      var calledOn = test.call(target, 5, 10);
      var appliedOn = test.apply(target, [5, 10]);

      expect( calledOn ).toBe(target);
      expect( appliedOn ).toBe(target);
    });


    it('will bind the constructor invocation pattern to a brand new object instance.', function() {

      function TestWidget(name) {
        this.name = name;
      }

      var beep = new TestWidget('beep');
      var bop = new TestWidget('bop');

      expect(beep.name).toBe('beep');
      expect(bop.name).toBe('bop');
    });
  });


  describe('prototypal inheritance', function() {

    it('links a function\'s "prototype" object to all constructed object instances.', function() {

      function Person(name) {
        this.name = name;
      }

      Person.prototype = {
        greet: function() {
          return "Hello, I'm " + this.name;
        }
      };

      var person = new Person('Beep');

      expect(person.greet()).toBe("Hello, I'm Beep");

      expect(person.hasOwnProperty("name")).toBeTruthy();
      expect(person.hasOwnProperty("greet")).toBeFalsy();
    });


    it('will share methods and data structures between all instances, via the common prototype (BEWARE)', function() {

      function StuffDrawer() {}

      StuffDrawer.prototype = {
        stuff: [],
        addStuff: function(item) {
          this.stuff.push(item);
        }
      };

      var bob = new StuffDrawer();
      var pat = new StuffDrawer();

      bob.addStuff('paperclip');
      pat.addStuff('pencils');

      expect(bob.stuff).toEqual(pat.stuff);
      expect(bob.stuff.length).toBe(2);
      expect(pat.stuff.length).toBe(2);
    });


    it('should leverage the constructor function to create unique data structures for each instance.', function() {

      function StuffDrawer() {
        this.stuff = [];
      }

      StuffDrawer.prototype = {
        addStuff: function(item) {
          this.stuff.push(item);
        }
      };

      var bob = new StuffDrawer();
      var pat = new StuffDrawer();

      bob.addStuff('paperclip');
      pat.addStuff('pencils');

      expect(bob.stuff.length).toBe(1);
      expect(pat.stuff.length).toBe(1);
    });


    it('creates prototype chains using object "__proto__" properties.', function() {

      function Xwing() {

      }

      Xwing.prototype = {
        isSciFi: true
      };

      var xwing = new Xwing();

      expect(xwing.__proto__).toBe(Xwing.prototype);
      expect(Xwing.prototype.__proto__).toBe(Object.prototype);
      expect(xwing.__proto__.__proto__).toBe(Object.prototype);
    });
  });

});