describe("pokemon", function(){

  it("can find a pokemon by name", function(){
    expect(pokemon.findPokemonByName("Pikachu").name).toBe("Pikachu");
  });

  it("can find the pokemon with the highest attack", function(){
    expect(pokemon.findStrongestPokemon().name).toBe("Dragonite");
  });

  it("can find pokemon by type", function(){
    var gengar = pokemon.findPokemonByName("Gengar");
    expect(pokemon.findPokemonByType("Ghost").length).toBe(3);
    expect(_.contains(pokemon.findPokemonByType("Ghost"), gengar)).toBe(true);
  });

  it("can find all the unique pokemon types", function(){
    expect(pokemon.findAllTypes().length).toBe(16);
    expect(_.contains(pokemon.findAllTypes(),"Normal")).toBe(true);
  });

  it("can determine the sum of stats of a particular pokemon", function(){
    expect(pokemon.totalStats("Jigglypuff")).toBe(270);
  });

});