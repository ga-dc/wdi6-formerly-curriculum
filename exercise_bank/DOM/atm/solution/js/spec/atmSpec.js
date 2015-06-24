describe("ATM", function(){

  describe("has ", function(){
    var atm = new ATM({savings: "100"});

    it("a checking property that is always a number", function(){
      expect(atm.checking).toBeDefined();
      atm.deposit("checking", "100");
      expect(atm.checking).toBe(100);
    });
    it("a savings property that is always a number", function(){
      expect(atm.savings).toBeDefined();
      atm.withdraw("savings", "100");
      expect(atm.savings).toBe(0);
    });
    it("a withdraw method", function(){
      expect(atm.hasOwnProperty("withdraw")).toBe(true);
      expect(atm.withdraw).toEqual(jasmine.any(Function));
    });
    it("a deposit method", function(){
      expect(atm.hasOwnProperty("deposit")).toBe(true);
      expect(atm.deposit).toEqual(jasmine.any(Function));
    });

  });

  describe("on initialization", function(){
    it("takes an object as an argument that sets up the accounts", function(){
      var atm = new ATM({checking: 22, savings: 500});
      expect(atm.checking).toBe(22);
      expect(atm.savings).toBe(500);
    });
    it("the object is optional", function(){
      var atm = new ATM({savings: 500});
      expect(atm.checking).toBe(0);
      expect(atm.savings).toBe(500);
    });
  });

  describe("#withdraw", function(){
    var atm;

    beforeEach(function(){
      atm = new ATM({checking: 200, savings: 100});
    });

    it("removes money from an account", function(){
      atm.withdraw("checking", 100);
      expect(atm.checking).toBe(100);
    });
    it("shifts money from other accounts in the ATM object", function(){
      atm.withdraw("checking", 250);
      expect(atm.checking).toBe(0);
      expect(atm.savings).toBe(50);
    });
    it("can't remove more money than is in the whole ATM", function(){
      atm.withdraw("checking", 350);
      expect(atm.checking).toBe(200);
    });

  });

  describe("#deposit", function(){

    it("adds money to an account", function(){
      var atm = new ATM();
      atm.deposit("savings", 100);
      expect(atm.savings).toBe(100);
    });

  });

  describe("ensures withdrawal/deposit only performed on good input",function(){
    var atm;

    beforeEach(function(){
      atm = new ATM();
    });

    it("returns true when the action is performed", function(){
      expect(atm.deposit("savings", 100)).toBe(true);
    });
    it("returns false and doesn't perform action when amount is negative", function(){
      expect(atm.deposit("savings", -100)).toBe(false);
      expect(atm.savings).toBe(0);
    });
    it("returns false and doesn't perform action when the amount is not a number", function(){
      expect(atm.deposit("savings", "cash!")).toBe(false);
      expect(atm.savings).toBe(0);
    });
    it("returns false and doesn't perform action when the account doesn't exist", function(){
      expect(atm.deposit("shlavings", 100)).toBe(false);
    });

  });

});