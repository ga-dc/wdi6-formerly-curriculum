CREATE TABLE superheroes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  alter_ego VARCHAR(50),
  has_cape BOOLEAN,
  power VARCHAR(50),
  arch_nemesis VARCHAR(30)
);
