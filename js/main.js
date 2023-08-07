// Start the game by clicking on the ship
// Should trigger the USS Sarah as the player ship by invoking GameManager
window.startGame = function(playerShip) {
  GameManager.startGame(playerShip);
};

// An object that will be used for both the player ship and alien ship
// An object that represents a spacecraft (player ship or alien ship)
class Spacecraft {
  constructor(name, hull, firepower, accuracy, isAlien = false) {
    this.name = name;
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
    this.isAlien = isAlien;
  }
}

// Game manager that handles overall game logic
let GameManager = {
  currentAlienIndex: 0,
// Player name and stats
  playerStats: [{ hull: 15, firepower: 5, accuracy: 0.7 }],

// Start the game once the player is clicked on
  startGame: function(playerShip) {
    this.resetPlayer(playerShip);
    this.setPreFight();
  },

// Grab the player stats and show the player ship
  resetPlayer: function(playerShip) {
    player = new Spacecraft(playerShip, this.playerStats[0].hull, this.playerStats[0].firepower, this.playerStats[0].accuracy);
    const getInterface = document.querySelector(".interface");
    getInterface.innerHTML = `
      <img src="images/ussSarah.gif" class="images/ussSarah.gif">
      <div>
        <h3>${playerShip}</h3>
        <p class="hull-player">Hull: ${player.hull}</p>
        <p>Firepower: ${player.firepower}</p>
        <p>Accuracy: ${player.accuracy}</p>
      </div>`;
  },

// Search for an Alien ship
  setPreFight: function() {
  const getHeader = document.querySelector(".header");
  const getActions = document.querySelector(".actions");
  const getArena = document.querySelector(".arena");
  getHeader.innerHTML = '<p>Task: Defeat the Alien ships or retreat!</p>';
  getHeader.innerHTML = '<p>Check the console for a fight report</p>';
  getActions.innerHTML = `
    <a href="#" class="btn-prefight" onclick="GameManager.setFight()">Search for an Alien ship!</a>`;

  getArena.style.visibility = "visible";
  this.currentAlienIndex = 0;

// Creating the retreat button
  const retreatButton = document.querySelector(".btn-retreat");
  retreatButton.classList.remove("hidden");
  retreatButton.addEventListener("click", () => {
    this.showDefeat();
    console.log("You've retreated to fight another day!")
  });
},

// Once you defeat all 6 alien ships, you get a congratz message and asked to play again
  setFight: function() {
    if (this.currentAlienIndex >= 6) {
      alert("Congratulations! You destroyed all Alien ships! Click the play again button or refresh the browser to play again.");
      this.showWinner();
      return;
    }

// Setting up the Alien ships
    const getHeader = document.querySelector(".header");
    const getActions = document.querySelector(".actions");
    const getAlien = document.querySelector(".alien");
    const alienTypes = ["Alien 1", "Alien 2", "Alien 3", "Alien 4", "Alien 5", "Alien 6"];
    const theAlien = alienTypes[this.currentAlienIndex];

// Setting up the logic for random Alien Stats
// Define randomStat function outside of setFight 
  function randomAlienStat(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }   
    alien = new Spacecraft(theAlien, randomAlienStat(3, 6), randomAlienStat(2, 4), randomAlienStat(0.6, 0.8));
    this.currentAlienIndex++;
    getHeader.innerHTML = '<p>Task: Attack or Retreat to fight another day.</p>';
    getActions.innerHTML = `<a href="#" class="btn-prefight" onclick="PlayerFunction.calcAttack(player, alien)">Attack!</a>`;
    console.log("An Alien has been found!")
    getAlien.innerHTML = `
      <img src="./images/aliens/${theAlien.replace(/\s+/g, '_')}.gif" class="alien-img">
      <div>
        <h3>${theAlien}</h3>
        <p class="hull-alien">Hull: ${alien.hull}</p>
        <p>Firepower: ${alien.firepower}</p>
        <p>Accuracy: ${alien.accuracy.toFixed(1)}</p>
      </div>`;   
  },

// Once all 6 aliens are defeated, you get a winner image
  showWinner: function() {
    console.log("You've won every battle against the Aliens!");
    const getAlien = document.querySelector(".alien");
    getAlien.innerHTML =
      `<img src="images/youwin/youWin.gif">
      <p>You've saved the world! Would you like to </p>`
      activatePlayAgainButton(getAlien);
  },

// If you lose to the Aliens, you get a defeat message and two images appear  
  showDefeat: function() {
    const getAlien = document.querySelector(".alien");
    getAlien.innerHTML = 
      `<img src="images/youlose/alienYouLose.gif">
      <img src="images/youlose/alienYouLose2.gif">
      <p>You lose! But don't give up now! </p> `;
      activatePlayAgainButton(getAlien);
  }
};

//Play again button function
function activatePlayAgainButton(parentElement) {
  const playAgainButton = document.createElement("button");
  playAgainButton.id = "playAgainButton";
  playAgainButton.textContent = "Play again?";
  parentElement.appendChild(playAgainButton);

  playAgainButton.addEventListener("click" , () => {
    location.reload();
  });
}

// Setting up the logic for how a player and alien attack each other
// The player and the alien's firepower will hit if the accuracy checks out
// If the player hits the alien, an alert should pop up to tell the player they got a hit
// Same should be the case if the alien got a hit, otherwise should alert a miss
// If the player gets destoried alert that
// If the alien gets destoried, alert that too
// If player wins, show winning gif
// If player loses, show losing gif
const PlayerFunction = {
  calcAttack: function(player, alien) {
    const playerAttack = player.firepower;
    const alienAttack = alien.firepower;
    const playerMissed = "Your attack missed the Alien.";
    const alienMissed = "The Alien ship missed you!";
    const alienHit = `The Alien ship hit you for ${alienAttack} damage`;
    const playerDestroyed = "Oh no! Your ship was destroyed.";

    if (Math.random() < player.accuracy) {
      alien.hull -= playerAttack;
      alert(`You hit the Alien ship for ${playerAttack} damage.`);
      console.log("You've damaged the Alien for " + playerAttack)
      if (alien.hull <= 0) {
        alert("Congratulations! You destroyed the Alien ship!");
         console.log("You've destroyed the Alien ship!");
        GameManager.setFight();
      } else {
        // Update alien's hull points directly in the DOM after player's attack
        document.querySelector(".hull-alien").textContent = `Hull: ${alien.hull}`;

        player.hull -= alienAttack;
        alert(alienHit);
        console.log("The Alien has done " + alienAttack + " damage to you.")
        if (player.hull <= 0) {
          alert(playerDestroyed);
          GameManager.showDefeat();
        } else {
          // Update player's hull points directly in the DOM after both attacks
          document.querySelector(".hull-player").textContent = `Hull: ${player.hull}`;
        }
      }
    } else {
      alert(playerMissed);
      console.log("You missed!")
      // Handle the alien's attack after player missed
      if (Math.random() < alien.accuracy) {
        player.hull -= alienAttack;
        alert(alienHit);
        console.log(alienHit)
        if (player.hull <= 0) {
          alert(playerDestroyed);
          console.log("The Aliens have destroyed you! Game Over")
          GameManager.showDefeat();
        } else {
          // Update player's hull points directly in the DOM after the alien's attack
          document.querySelector(".hull-player").textContent = `Hull: ${player.hull}`;
        }
      } else {
        alert(alienMissed);
        console.log("The Alien missed!")
      }
    }
  },
};
