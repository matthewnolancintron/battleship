import player from "./player.js";
//const ship = require("./ship");
//const gameBoard = require("./gameBoard");


(function gameLoop() {
  //create players
  let humanPlayer = player("human");
  let computerPlayer = player("A.I");

  console.log("create players", humanPlayer, computerPlayer);

  //populate gameBoards for both players
  console.log(humanPlayer.playersBoard, "humansBoard");
  console.log(computerPlayer.playersBoard, "computers board");

  //todo might move creation
  //of ships types to the ship module somehow.
  //or create second helper module for ship type
  //and how many there are in the game?

  /**
   * could move to the player or gameBoard modules
   * and add method for creating ship types for player
   * to then place or machine to auto place.
   */

  /**
   * could make the randomized ship placement
   * a feature of the game if a player would like
   * to set up ships on the board in a randomized
   * fashion and still use it for A.I ship placement.
   * 
   * feature:
   * a button to placeships in random order for player
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
        } while (attemptCount == 0);

        console.log(attempt);
         */

      //used as a condition for the do while loop
      //will keep trying until attempt is a success
      //then this varible is incremented by
      //ending the attempt loop.
      let attemptCountForHumanShipPlacement = 0;

      //place ship for human
      let shipPlacementAttemptForHuman = '';

      do{
        //try to place a ship
        shipPlacementAttemptForHuman = humanPlayer.playersBoard.placeShip(
          ship.length,
          possibleStartingCoordiantes[
            Math.floor(Math.random() * possibleStartingCoordiantes.length)
          ],
          possibleDirectionsOfPlacement[
            Math.floor(Math.random() * possibleDirectionsOfPlacement.length)
          ]
        );

        //log the result of the attempt
        console.log(shipPlacementAttemptForHuman,'result for human');


        if(shipPlacementAttemptForHuman == 'placement succesfull'){
          attemptCountForHumanShipPlacement++;
        } else {
          console.log('try again attemp for human is equal to ', shipPlacementAttemptForHuman);
        }
      }while(attemptCountForHumanShipPlacement == 0);
      
      //repeat similar process for A.I ship placement
      let attemptCountForAIShipPlacement = 0;
      let shipPlacementAttemptForAI = '';

      do{
        //place ship for 'A.I'
        shipPlacementAttemptForAI = computerPlayer.playersBoard.placeShip(
          ship.length,
          possibleStartingCoordiantes[
            Math.floor(Math.random() * possibleStartingCoordiantes.length)
          ],
          possibleDirectionsOfPlacement[
            Math.floor(Math.random() * possibleDirectionsOfPlacement.length)
          ]
        );

        if(shipPlacementAttemptForAI == 'placement succesfull'){
          attemptCountForAIShipPlacement++;
        } else{
          console.log('try again attemp for AI is equal to ', shipPlacementAttemptForAI);
        }
      }while(attemptCountForAIShipPlacement == 0);


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

  /**
   * todo:
   * implement a system for allowing players
   * to place their ships later.
   * 
   *  There are several options available 
      for letting users place their ships.
      You can let them type coordinates 
      for each ship, or investigate 
      implementing drag and drop.
   */

    /**
     * todo:optional
     * polish the intelligence of
     * the computer player by
     * having it try adjacent
     * slots after getting a ‘hit’.
     */



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
