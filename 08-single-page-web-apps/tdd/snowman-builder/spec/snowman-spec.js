var Snowman = require( "../snowman" );

describe( "A snowman", function(){
  var olaf;

  beforeEach(function(){
    olaf = new Snowman("Olaf");
  });

  it( "should have a name", function(){
    expect( olaf.name ).toBeDefined();
  });

  it("should have a carrot nose and stick arms", function () {
    expect ( olaf.features ).toContain("carrot nose", "stick arms");
  });

  describe("A snowman named Olaf", function(){
    var frosty;
    it( "should like warm hugs", function(){
      frosty = new Snowman("Frosty");
      expect( olaf.hug() ).toBe( "I like warm hugs!" );
      expect( frosty.hug() ).not.toBe( "I like warm hugs!" );
    });
  });

});
