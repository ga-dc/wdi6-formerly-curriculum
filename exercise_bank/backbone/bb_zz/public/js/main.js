
// *************************************************
// **********        EXHIBIT MVC          **********
// *************************************************

// **********       EXHIBIT MODEL         **********
// This is model that describes a specific exhibit,
// and it contains a number of animals, an animal
// type, and a random description of those animals.
//
var ExhibitModel = Backbone.Model.extend({

  initialize: function(number, animal, status) {
    console.log("Initialized ExhibitModel:");

    this.set({
      number: number,
      description: this.randomDescription(status), // notice I'm calling, not referencing...
      animal: animal
    });

    console.log(
      this.get("number") + " " +
      this.get("description") + " " +
      this.get("animal")
    );
  },

  randomDescription: function(status){
    return (status != "escaped") ?
      _.sample([
        "Laconic","Sad","Lonely","Cold","Under-stimulated","Lost","Confused",
        "Depressing","Broken","Stoic","Furtive","Tired","Dirty","Pessimistic"
      ]) :
      _.sample([
        "Excited","Hopeful","Liberated","Free","Optimistic","Actualized","Gay",
        "Joyful","Euphoric","Timid","Playful","Bemused","Awe-struck","Happy",
        "Reluctant","Suspicious","Cautious","Balls-to-the-wall","Gung-ho"
      ]);
  }
});




// **********    EXHIBIT COLLECTION      **********
// This is the collection of exhibits, ie the list
// of exhibit models.
//
var ExhibitList = Backbone.Collection.extend({
  model: ExhibitModel,

  initialize: function() {
    console.log("Initialized ExhibitList...");
  }
});




// **********   EXHIBIT (SINGLE) VIEW    **********
// This is the view controller that describes the
// interaction with an exhibit on the page, its ren-
// dering and removal.
//
var ExhibitView = Backbone.View.extend({
  tagName:   "li",  // will hook on to an unordered list (ul), thus it should be an li
  className: "view exhibit-view", // ie green

  template: _.template( $("script[type='text/html']#cage-template").html() ),

  initialize: function() {
    console.log("Initialized ExhibitView...");

    this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model, "destroy", this.remove);

    this.render();
  },
  render: function() {
    console.log("Rendering ExhibitView from JSON object: ");
    console.log(this.model.toJSON());

    this.$el.attr( "data-cid", this.model.cid ); // add data attribute
    this.$el.html( this.template(this.model.toJSON()) );
  }

});




// **********    EXHIBIT (LIST) VIEW     **********
// This is the view controller that describes the
// interaction with an exhibit on the page, its ren-
// dering and removal.
//
var ExhibitListView = Backbone.View.extend({
  tagName:   "ul", // will be a hook for child views...
  className: "view exhibit list-view clear",

  initialize: function() {
    console.log("Initialized ExhibitListView...");

    this.listenTo(this.collection, "add",  this.addOne);
    this.listenTo(this.collection, "reset", this.addAll);
    this.addAll();
  },

  events: {
    "click li": "animalTouch"
  },

  addAll: function() {
    console.log("ExhibitListView#addAll...");

    this.$el.html("");
    this.collection.each(this.addOne, this);
  },
  addOne: function(exhibit) {
    console.log("ExhibitListView#addOne...");

    var view = new ExhibitView({model: exhibit});
    this.$el.append(view.el);
  },

  animalTouch: function(e) {
    var el =    e.currentTarget,
        $el =   $(el),
        cid =   $el.data("cid"),
        model = this.collection.get(cid);

    $el.effect( "shake" );

    // wrap the alert in an anonymous function to send as a callback, and then bind the
    // context to "this" so that inside that function "this" means what we want it to mean...
    var callAlert = function(){alert("Don't touch the " + model.get("animal") + "!")};
    //callAlert = callAlert.bind(this);
    setTimeout(callAlert, 500);

    var currentDescription = model.get("description");

    // touching makes the animal annoyed; if it already annoyed it makes it angry!
    if (currentDescription === "Angry") {
      // stays mad...
    } else if (currentDescription === "Annoyed") {
      model.set("description", "Angry");
    } else {
      model.set("description", "Annoyed");
    }
  }
});




// **********    EXHIBIT (FORM) VIEW     **********
// This is the view controller that describes the
// interaction with the form for the exhibit list.
//
var ExhibitFormView = Backbone.View.extend({

  initialize: function() {
    console.log("Initialized ExhibitFormView...");

    this.$el.addClass( "view exhibit form-view" );
  },

  events: {
    "submit": "addExhibit"
  },

  addExhibit: function(e) {
    console.log("ExhibitFormView#addExhibit...");

    e.preventDefault();
    var animal = _(this.$el.find("input[name='animal']").val())
                  .chain().trim().capitalize().value();
    var number = this.$el.find("select[name='number']").val();
    this.el.reset();

    var route = "animal/" + encodeURI(animal) + "/number/" + encodeURI(number);
    Router.forceNavigate(route, animal, number);
    //Backbone.history.navigate(route, {trigger: true});
  }
});




// *************************************************
// **********         ESCAPE MVC          **********
// *************************************************


// **********    ESCAPE COLLECTION     **********
// This is the collection of escapes, ie the list
// of exhibit models representing freed animals!
//
var EscapeList = Backbone.Collection.extend({
  model: ExhibitModel,

  initialize: function() {
    console.log("Initialized EscapeList...");
  }
});




// **********    ESCAPE (LIST) VIEW     **********
// This is the view controller that describes the
// interaction with an escape on the page, its ren-
// dering and removal.
//
var EscapeListView = Backbone.View.extend({
  tagName:   "ul", // will be a hook for child views...
  className: "view escape list-view",

  initialize: function() {
    console.log("Initialized EscapeListView...");

    this.listenTo(this.collection, "add",  this.addOne);

    this.render(true);
  },
  render: function(isEmpty){
    console.log("Rendering EscapeListView...");

    if (isEmpty) {
      this.$el.html("");
    } else {
      this.$el.html("<h3>Roaming the streets of Ohio are now:</h3>");
    }
  },

  addOne: function(exhibit) {
    console.log("EscapeListView#addOne...");

    if (this.collection.length > 0) {
      this.render(false);
    }
    var view = new ExhibitView({model: exhibit});
    this.$el.append(view.el);
  }
});




// **********     ESCAPE (FORM) VIEW      **********
// This is the view controller that describes the
// interaction with the form for the escape list.
//
var EscapeFormView = Backbone.View.extend({

  initialize: function(router) {
    console.log("Initialized EscapeFormView...");

    this.router = router;
    this.$el.addClass( "view escape form-view" );
    this.$el.find("button").text( _.sample(this.foolishMistakes) );
  },

  events: {
    "submit": "addEscape"
  },

  foolishMistakes: ["Doze Off...","Cigarette Break...",
                    "Sext a Coworker...","Shop Online...",
                    "Spill Coffee...","Read Want Ads..."],

  addEscape: function(e) {
    console.log("EscapeFormView#addEscape...");

    this.$el.find("button").text( _.sample(this.foolishMistakes) );

    e.preventDefault();
    Router.forceNavigate("escape!"); //formerly Backbone.history.navigate("escape!", {trigger: true});
  }
});



// *************************************************
// **********       (/#)  ZOO VIEW        **********
// *************************************************

// This is an overarching view controller for the
// the page, on which we interact with the exhibits.
//
var ZooView = Backbone.View.extend({
  initialize: function() {
    console.log("Initialized ZooView...");

    // initialize form child views on an existing DOM "hook"
    this.exhibitForm = new ExhibitFormView({el: "form#exhibit"});
    this.escapeForm = new EscapeFormView({el: "form#escape"});
    this.$el.addClass( "view zoo-view" );
  }
});




// *************************************************
// **********         APP ROUTER          **********
// *************************************************

var ZooRouter = Backbone.Router.extend({
  routes: {
    "": "index",
    "animal/:animal/number/:number": "addExhibit",
    "escape!": "addEscape"
  },

  initialize: function(exhibitList, escapeList) {
    console.log("Initialized ZooRouter...");

    this.exhibitList = exhibitList;
    this.escapeList = escapeList;
  },

  index: function() {
    console.log("---> Navigated to index!");

    // initialize the overall view on an existing DOM "hook", and
    // save it as this.main
    this.main = new ZooView({el: $("#backbone-app")});

    // load the necessary child view(s) into the overall view
    this.loadChildView(
      "exhibitListView",
      new ExhibitListView({collection: this.exhibitList})
    );
    this.loadChildView(
      "escapeListView",
      new EscapeListView({collection: this.escapeList})
    );
    this.main.$el.append( $("<div class='clear'>") ); // clear floats...
  },

  addExhibit: function(animal,number) {
    console.log("---> Navigated to addExhibit!");
    this.lastAction = this.addExhibit;
    if (this.animalExists(animal, number)){
      // increment the number of animals in the exhibit
      var exhibit = this.exhibitList.findWhere({animal: animal});
      exhibit.set({
        number:
        parseInt(exhibit.get("number")) + parseInt(number)
      });
    } else {
      // add a new model to the exhibit collection
      this.exhibitList.add( new ExhibitModel(number, animal) );
    }
  },

  addEscape: function() {
    console.log("---> Navigated to addEscape!");
    this.lastAction = this.addEscape;
    var escapees = false;

    // make a copy of the collection to iterate over, so that if we
    // destroy elements it doesn't screw up our current index
    _.clone(this.exhibitList).each( function(exhibit) {
      var number = parseInt( exhibit.get("number") );
      var escapedNumber = Math.floor(Math.random() * (number+1));
      var animal = exhibit.get("animal");

      console.log("Of "+number+" x "+animal+", "+escapedNumber+" escaped!");

      if (escapedNumber > 0) {
        escapees = true; // set the escapees flag for the alert...
        this.escapeList.add( new ExhibitModel(escapedNumber, animal, "escaped") );

        if (escapedNumber == number) { // all of them escaped!
          exhibit.destroy();
        } else {                       // some of them escaped
          exhibit.set("number", number-escapedNumber);
        }
      }
    });

    if (escapees) {
      alert("You fool! There's been an escape!");
    }
  },

  animalExists: function(animal, number) {
    console.log("ExhibitListView#animalExists: " + animal);

    return this.exhibitList.findWhere({animal: animal}) ? true : false;
  },

  loadChildView: function(viewName, view) {
    console.log("Router#loadChildView...");

    // remove the current child view from the DOM if it exists
    this[viewName] && this[viewName].remove();
    this[viewName] = view; // replace referenced view
    this.main.$el.append(view.el); // append it to DOM
  },

  forceNavigate: function () {
    var route = arguments[0];
    if (arguments.length > 1) {
      var params = _.rest(arguments);
    }
    if (Backbone.history.fragment === route) {
      this.lastAction.apply(this, params);
    } else {
      Backbone.history.navigate(route, {trigger: true});
    }
  }

});




// *************************************************
// **********     APP INITIALIZATION      **********
// *************************************************

$(function() {
  console.log("Application v2 loaded!");

  //initialize collections
  exhibitList = new ExhibitList();
  escapeList = new EscapeList();

  // clean any hashes from URL
  window.location.hash = "";

  // begin routing
  Router = new ZooRouter(exhibitList, escapeList);

  // exhibitList.add(new ExhibitModel(3, "Lions"));
  // exhibitList.add(new ExhibitModel(3, "Tigers"));
  // exhibitList.add(new ExhibitModel(3, "Bears"));

  Backbone.history.start();
});
