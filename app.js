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

// Creating both the player and enemy ships
class Ships {
  constructor(name, hull, firepower, accuracy) {
    this.name = name;
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }
}

// Define player ship
const playerShip = new Ships("USS Sarah", 20, 5, 0.7);

// Define the 6 Alien ships
const alienShips = [];
for (let i = 1; i <= 6; i++) {
  const hull = randomNum(3, 6);
  const firepower = randomNum(2, 4);
  const accuracy = (randomNum(6, 8) / 10).toFixed(1);
  const alienShip = new Ships(`Alien Ship ${i}`, hull, firepower, accuracy);
  alienShips.push(alienShip);
}

// Define randomNum so the above code can work with the alien ships
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// A function that will determine if an attack is successful or not based on the ship's accuracy
this.goodHit = function () {
    return Math.random() < this.accuracy;
  }

// Method used to attack the other ship
