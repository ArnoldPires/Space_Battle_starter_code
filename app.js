// Build a game of battling aline spaceships using JavaScript

/*
Logic:

There are 6 alien ships and only one of you. All 6 must be destoryed.
Each alien ship only attacks one at a time. So turn based.
After destorying one ship, be prepared to fight another until all 6 are destoried.
Your ship always attacks first.
You have the ability to retreat, but if you do, you lose.

A game round would look like this:
* You attack the first alien ship
* If the ship survives, it attacks you
* If you survive, you attack the ship again
* If it survives, it attacks you again ... etc
* If you destroy the ship, you have the option to attack the next ship or to retreat
* If you retreat, the game is over, perhaps leaving the game open for further developments or options
* You win the game if you destroy all of the aliens
* You lose the game if you are destroyed
*/

// Player Ship Properties:
/*
  * USS Sarah has 20 hitpoints total if reachs 0, game over.
  * Player ship does 5 hitpoint damage if it hits.
  * Player ship has a .7 chance of hitting the enemy ship so Math.random needs to be used.
*/

// Alien Ship Properties:
/*
  * Alien ship has between 3 to 6 hitpoints.
  * Alien ship can do between 2 to 4 damage.
  * Alien ship has an accuracy between .6 to .8
*/