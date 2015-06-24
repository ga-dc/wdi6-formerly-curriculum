describe("#hourHandAngle", function(){
  it("returns the degrees the minute has moved", function(){
      expect(hourHandAngle(4,30)).toBe(135)
  });
});

describe("#minuteHandAngle", function(){
  it("returns the degrees the minute has moved", function(){
      expect(minuteHandAngle(30)).toBe(180)
  });
});

describe("#angleBetweenHands", function(){
  it("works at noon", function(){
      expect(angleBetweenHands("12:00")).toBe(0)
  });

  it("works at when the hour changes", function(){
      expect(angleBetweenHands("1:00")).toBe(30)
  });

  it("works at when the hour hand is ahead", function(){
      expect(angleBetweenHands("6:10")).toBe(125)
  });

  it("works when the minute hand is ahead", function(){
      expect(angleBetweenHands("2:30")).toBe(105)
  });

  it("gives the smaller, positive angle (<180 degrees)", function(){
      expect(angleBetweenHands("10:20")).toBe(170)
  });
});