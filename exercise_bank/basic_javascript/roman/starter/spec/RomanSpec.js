describe("romanize", function() {
  it("converts 1", function() {
    expect(romanize(1)).toEqual('I');
  });

  it("converts 2", function() {
    expect(romanize(2)).toEqual('II');
  });

  it("converts 3", function() {
    expect(romanize(3)).toEqual('III');
  });

  it("converts 4", function() {
    expect(romanize(4)).toEqual('IV');
  });

  it("converts 5", function() {
    expect(romanize(5)).toEqual('V');
  });

  it("converts 6", function() {
    expect(romanize(6)).toEqual('VI');
  });

  it("converts 9", function() {
    expect(romanize(9)).toEqual('IX');
  });

  it("converts 10", function() {
    expect(romanize(10)).toEqual('X');
  });

  it("converts 26", function() {
    expect(romanize(26)).toEqual('XXVI');
  });

  it("converts 47", function() {
    expect(romanize(47)).toEqual('XLVII');
  });

  it("converts 60", function() {
    expect(romanize(60)).toEqual('LX');
  });

  it("converts 91", function() {
    expect(romanize(91)).toEqual('XCI');
  });

  it("converts 145", function() {
    expect(romanize(145)).toEqual('CXLV');
  });

  it("converts 173", function() {
    expect(romanize(173)).toEqual('CLXXIII');
  });

  it("converts 400", function() {
    expect(romanize(400)).toEqual('CD');
  });

  it("converts 675", function() {
    expect(romanize(675)).toEqual('DCLXXV');
  });

  it("converts 911", function() {
    expect(romanize(911)).toEqual('CMXI');
  });

  it("converts 1024", function() {
    expect(romanize(1024)).toEqual('MXXIV');
  });

  it("converts 2014", function() {
    expect(romanize(2014)).toEqual('MMXIV');
  });
});