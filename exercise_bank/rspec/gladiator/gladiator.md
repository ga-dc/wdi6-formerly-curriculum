# RSpec Gladiator Arena

The Emperor has commissioned you to build a Gladiator Arena. Your life depends on developing a well-thought-out arena, so you are constructing it in a test-driven way using RSpec.

#### Gladiator Spec

* A gladiator has a name
* A gladiator has a weapon

#### Arena Spec

* An arena has a name
  * the name should be capitalized
* An arena can have gladiators
* You can add a gladiator to the arena
  * The arena should never have more than 2 gladiators in it at a time
* If there are two gladiators in the arena, you can call a fight method that results in the elimination of one of the gladiators from the arena.
  * Winning conditions:
    * Trident beats Spear
    * Spear beats Club
    * Club beats Trident
    * If the two gladiators have the same weapon, they are both eliminated.

#### Bonus

* Add a method to remove gladiators from the arena by name

* Update your winning conditions so that if the gladiator named "Maximus" is in the fight, he wins.

* Add a method to check to see if the crowd is entertained (`.entertained?`). The crowd is only entertained if Maximus is in the arena.

* Before a losing gladiator is eliminated, the user should be prompted to put their thumbs up or down. If user votes down, the losing gladiator is removed. If the user votes up, the gladiator stays in the arena and his opponent is removed. (Life isn't fair.)

