import player from "./player.js";
//const ship = require("./ship");
//const gameBoard = require("./gameBoard");
/**
 * For now just populate each Gameboard.
 * with predetermined coordinates.
 * You can implement a system for
 * allowing players to place their ships later.
 */
(function gameLoop() {
  //create players
  let humanPlayer = player("human");
  let computerPlayer = player("A.I");

  console.log("create players", humanPlayer, computerPlayer);

  //populate gameBoards for both players
  /*
  For now just populate each Gameboard. 
  with predetermined coordinates. 
  You can implement a system for 
  allowing players to place their ships later.
  */
  console.log(humanPlayer.playersBoard, "humansBoard");
  console.log(computerPlayer.playersBoard, "computers board");

  //todo might move to the ship module somehow.
  //or create second helper module for ship type
  //and how many there are in the game?

  /**
   * could move to the player or gameBoard modules
   * and add method for creating ship types for player
   * to then place or machine to auto place.
   */

  /**
num |  type | length
   *1 Carrier 	    5
 	2 Battleship 	4
 	3 Destroyer 	3
 	4 Submarine 	3
 	5 Patrol Boat 	2 
   */

  let carrier = {
    num: 1,
    typeOfShip: "Carrier",
    length: 5,
  };

  let battleShip = {
    num: 2,
    typeOfShip: "BattleShip",
    length: 4,
  };

  let destroyer = {
    num: 3,
    typeOfShip: "Destroyer",
    length: 3,
  };

  let submarine = {
    num: 4,
    typeOfShip: "sumbarine",
    length: 3,
  };

  let patrol_boat = {
    num: 5,
    typeOfShip: "Patrol Boat",
    length: 2,
  };

  let ships = [carrier, battleShip, destroyer, submarine, patrol_boat];

  let possibleStartingCoordiantes = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
  ]
    .map((letter) => Array.from(Array(10).keys(), (x) => `${letter}${x + 1}`))
    .flat(1);

  let possibleDirectionsOfPlacement = ["horizontal", "vertical"];

  ships.forEach((ship) => {
    //place ship.num number of that ship
    for (let index = 0; index < ship.num; index++) {
      /**
       * make sure to retry placement on unsucceful
       * attemps so that all ships are placed
       */

      /**
        psuedo code for try something until succseful
        at least once before moving on
        
        function yesNo(){
            let choice = ['y','x,'z'];
            return choice[Math.floor(Math.random()*choice.length)];
        }
        
        let attemptCount  = 0;
        let attempt; 
        
        do {
            attempt = yesNo();
            console.log(attempt)
  
            if(attempt = 'y'){
                attemptCount++;
            } else {
                console.log('try again',attempt);
            }
        } while (attempt == 0);

        console.log(attempt);
         */

      //place ship for human
      let shipPlacementAttemptForHuman = humanPlayer.playersBoard.placeShip(
        ship.length,
        possibleStartingCoordiantes[
          Math.floor(Math.random() * possibleStartingCoordiantes.length)
        ],
        possibleDirectionsOfPlacement[
          Math.floor(Math.random() * possibleDirectionsOfPlacement.length)
        ]
      );

      //place ship for 'A.I'
      computerPlayer.playersBoard.placeShip(
        ship.length,
        possibleStartingCoordiantes[
          Math.floor(Math.random() * possibleStartingCoordiantes.length)
        ],
        possibleDirectionsOfPlacement[
          Math.floor(Math.random() * possibleDirectionsOfPlacement.length)
        ]
      );
    }
  });

  //check players aramdas
  console.log(humanPlayer.playersBoard.armada, "humans ships");
  console.log(
    humanPlayer.playersBoard.coordinatesOfMyShips,
    "placement of ships for human"
  );

  console.log(computerPlayer.playersBoard.armada, "AI ships");
  console.log(
    computerPlayer.playersBoard.coordinatesOfMyShips,
    "placement of ships for A.I"
  );
})();

function setUpNewGame() {
  //create players
  //populate the players gameboards
}

function populateGameBoard() {}

//creates array of two player instances
function createPlayers() {
  return [].push(player("human")).push("A.I");
}

/**
 * The game loop should step through
 * the game turn by turn using only
 *  methods from other objects.
 *  If at any point you are tempted
 *  to write a new function inside the game loop,
 *  step back and figure out which
 * class or module that function should
 * belong to.
 */

/**
 * Create conditions so that the game
 *  ends once one players ships have
 * all been sunk. This function is appropriate
 * for the Game module.
 */
