describe("#isNumber", function(){
  it("returns true for a number", function(){
    expect(isNumber("5")).toBeTruthy();
  });

  it("returns false for a word", function(){
    expect(isNumber("banana")).toBeFalsy();
  });
});

describe("#doubleSort", function(){
  it("sorts words", function(){
    expect(doubleSort(["sugar", "butter", "egg"])).toEqual(["butter", "egg", "sugar"]);
  });

  it("sorts numbers", function(){
    expect(doubleSort(["12", "10", "3", "4", "1"])).toEqual(["1", "3", "4", "10", "12"]);
  });

  it("sorts words and numbers together", function(){
    expect(doubleSort(["16","8","4","salt","baking","soda"])).toEqual(["4", "8", "16", "baking", "salt", "soda"]);
  });

  it("sorts a mixed array of words and numbers and maintains their order", function(){
    expect(doubleSort(["2", "4", "banana", "1", "vanilla", "flour"])).toEqual(["1", "2", "banana", "4", "flour", "vanilla"]);
  });
});