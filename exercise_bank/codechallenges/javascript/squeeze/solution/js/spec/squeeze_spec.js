describe("#squeeze", function(){
  it("works for two letters", function(){
      expect(squeeze("oo")).toBe("o")
  });

  it("works for multiple repetitions of a letter within a single word", function(){
      expect(squeeze("shmeeeeeee!")).toBe("shme!")
  });

  it("does not change a word with duplicates that are not consecutive", function(){
      expect(squeeze("banana")).toBe("banana")
  });

  it("works for multiple words", function(){
      expect(squeeze("yabba dabba doo")).toBe("yaba daba do")
  });

  it("works with capital letters", function(){
      expect(squeeze("AW-WEE-OO KILLER TOFU")).toBe("AW-WE-O KILER TOFU")
  });
});