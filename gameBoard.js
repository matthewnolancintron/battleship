// for testing with jest
//const ship = require("./ship");
import ship from "./ship.js";

function gameBoard() {
  return {
    /**
     * all ship types of the game
     * objects that act as instructions
     * for creating ship objects
     */
    /**
     * num |  type | length
     * 1 Carrier 	  5
     * 2 Battleship 	4
     * 3 Destroyer 	  3
     * 4 Submarine  	3
     * 5 Patrol Boat 	2
     */
    shipsOfTheGame: [
      {
        num: 1,
        typeOfShip: "Carrier",
        length: 5,
      },
      {
        num: 2,
        typeOfShip: "BattleShip",
        length: 4,
      },
      {
        num: 3,
        typeOfShip: "Destroyer",
        length: 3,
      },
      {
        num: 4,
        typeOfShip: "sumbarine",
        length: 3,
      },
      {
        num: 5,
        typeOfShip: "PatrolBoat",
        length: 2,
      },
    ],

    //an array of ships placed on the board
    armada: [],

    /**
     * coordiantes:
     * an object with key value pairs
     * each key is a coordinate like
     * a5 or letterNumber and the value
     * each key keeps track of the ship
     * if any are occuping that spot
     * will contain a refrenece to the
     * ship.
     */
    coordinatesOfMyShips: Object.fromEntries(
      ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
        .map((letter) =>
          Array.from(Array(10).keys(), (x) => [
            `${letter}${x + 1}`,
            "unoccupied",
          ])
        )
        .flat(1)
    ),

    coordinatesOfEnemyShips: Object.fromEntries(
      ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
        .map((letter) =>
          Array.from(Array(10).keys(), (x) => [
            `${letter}${x + 1}`,
            "unoccupied",
          ])
        )
        .flat(1)
    ),

    /**
     * ability to place ships
     * at specific coordinates
     * by calling the ship factory function
     *
     * return values after successful ship placement:
     * ???
     *
     * return values after non successful ship placement:
     * ???
     *
     */
    placeShip(lengthOfShip, startingCoordinate, directionOfPlacement,type) {
      let calculatedEndCoordinate;
      let calculatedCoordinateRange;
      let isOutOfBounds;

      //calcualte range of cooridante ship will be 'placed' at
      if (directionOfPlacement == "horizontal") {
        /**
         * if placeing the ship horizontally
         * then the letter will stay the same
         * but the number will update
         *
         * I'm going to assume that the starting
         * location when placing ship horizontally
         * is the ship's left most side such that
         * the rest of the ship is being place to the
         * right of that coordinate.
         *
         */
        let startingCoordianteNumber = parseInt(
          startingCoordinate.split("")[1]
        );

        //find end point
        calculatedEndCoordinate = startingCoordianteNumber + (lengthOfShip-1);

        /**
         * check for out of bounds:
         * due to position and length of ship
         */
        if (calculatedEndCoordinate > 10) {
          isOutOfBounds = true;
        }

        if (isOutOfBounds) {
          //return error for testing
          return "out of bounds ship can't be placed there";
        } else {
          //create coordiante range
          calculatedCoordinateRange = Array.from(Array(10).keys(), (x) => x + 1)
            .slice(startingCoordianteNumber - 1, calculatedEndCoordinate)
            .map((x) => `${startingCoordinate.split("")[0]}${x}`);
        }
      } else if (directionOfPlacement == "vertical") {
        /**
         * if vertical then when traversing
         * the board to place the ship
         *
         * the number stays the same
         * like d2 as a starting point would
         * still have (someletter)2 as an end point
         *
         * I could assume that all ships being placed
         * vertically are having the bottom of the ship
         * placed on the startingCoordiante such that
         * the rest of the ship is being placed above that
         * cooridante so the letter just have to be incremented
         *
         * if length of ship is 3 and starting point is at letter
         * g then it will go up to letter I, g(x) to i(x)
         *
         * use ['A','B','C','D','E','F','G','H','I','J']
         * this data structure to traverse x steps up
         * from the start to find the end point
         *
         */

        let startingCoordianteLetter = startingCoordinate.split("")[0];

        let startingCoordianteLetterPosition =
          startingCoordianteLetter.charCodeAt(0) - 65;

        calculatedEndCoordinate =
          startingCoordianteLetterPosition + (lengthOfShip-1);

        /**
         * check for out of bounds:
         * due to position and length of ship
         */
        if (calculatedEndCoordinate > 10) {
          isOutOfBounds = true;
        }

        if (isOutOfBounds) {
          //return error or throw error
          /**do error handling (need to learn how.) */
          return "out of bounds ship can't be placed there";
        } else {
          calculatedCoordinateRange = Array.from(Array(10))
            .map((e, i) => i + 65)
            .map((x) => String.fromCharCode(x))
            .slice(startingCoordianteLetterPosition, calculatedEndCoordinate)
            .map((x) => `${x}${startingCoordinate.split("")[1]}`);
        }
      }

      /**
       * check if there is already a ship
       * on any of the coords found
       * if each location is unoccupied
       * then place ship replace unoccupied
       * with using  ship(lengthOfShip)
       */
      console.log(calculatedCoordinateRange.length, 'coord range.length');
      console.log(lengthOfShip,'ship.length');
      console.log('------------------------------')
      /**
       * if coordiante range is less than or 
       * not equal to ships length than
       * return ship can't fit.
       */
      if(calculatedCoordinateRange.length != lengthOfShip){
        return "ship can't fit";
      }


      let shipToPlace = ship(lengthOfShip,type,calculatedCoordinateRange);
      let isUnocupied = calculatedCoordinateRange.every(
        (x) => this.coordinatesOfMyShips[x] == "unoccupied"
      );

      if (isUnocupied) {
        /**placing ship in coordinatesOfMyShips
         * a reference to the shipToPlace will be
         * available at each coordiante it's located
         */
        let positionOfShipNumber = 0;
        console.log(calculatedCoordinateRange,'coord range');
        calculatedCoordinateRange.forEach(
          //place the ship and it's position
          (x) => {
            console.log(positionOfShipNumber,'pos of ship num')
            this.coordinatesOfMyShips[x] = [shipToPlace, positionOfShipNumber];
            positionOfShipNumber++;
          }
        );
        // add ship to armada for quick access
        this.armada.push(shipToPlace);

        return "placement succesfull";
      } else {
        return "placement is occupied ship can't be place there";
      }
    },

    randomiseShipPlacements() {
      /**
       *
       */
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
        .map((letter) =>
          Array.from(Array(10).keys(), (x) => `${letter}${x + 1}`)
        )
        .flat(1);

      let possibleDirectionsOfPlacement = ["horizontal", "vertical"];

      //
      this.shipsOfTheGame.forEach((ship) => {
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
          let shipPlacementAttemptForHuman = "";
          
          do {
            //try to place a ship
            shipPlacementAttemptForHuman = this.placeShip(
              ship.length,
              possibleStartingCoordiantes[
                Math.floor(Math.random() * possibleStartingCoordiantes.length)
              ],
              possibleDirectionsOfPlacement[
                Math.floor(Math.random() * possibleDirectionsOfPlacement.length)
              ],
              ship.typeOfShip
            );

            //log the result of the attempt
            console.log(shipPlacementAttemptForHuman, "result for human");

            if (shipPlacementAttemptForHuman == "placement succesfull") {
              attemptCountForHumanShipPlacement++;
            } else {
              console.log(
                "try again attemp for human is equal to ",
                shipPlacementAttemptForHuman
              );
            }
          } while (attemptCountForHumanShipPlacement == 0);
        }
      });
    },

    clearShipPlacements() {
      // clear coordinatesOfMyShips
      this.coordinatesOfMyShips = Object.fromEntries(
        ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
          .map((letter) =>
            Array.from(Array(10).keys(), (x) => [
              `${letter}${x + 1}`,
              "unoccupied",
            ])
          )
          .flat(1)
      );

      // clear armada
      this.armada = [];
    },

    /**
     * receiveAttack function:
     * takes a coordinates
     * determines if the attack hit a ship
     * sends hit function to the correct ship
     * or records the coordinates of the missed shot
     */
    receiveAttack(coordinateOfOpponentsAttack) {
      let isAlreadyHit;
      if (
        this.coordinatesOfMyShips[coordinateOfOpponentsAttack] == "unoccupied"
      ) {
        isAlreadyHit = false;
      } else {
        switch (
          this.coordinatesOfMyShips[coordinateOfOpponentsAttack][0].positions[
            this.coordinatesOfMyShips[coordinateOfOpponentsAttack][1]
          ]
        ) {
          case undefined:
            isAlreadyHit = false;
            break;
          case "noHit":
            isAlreadyHit = false;
            break;
          case "hit":
            isAlreadyHit = true;
            break;
          default:
            break;
        }
      }

      if (
        this.receivedMissedAttacks.includes(coordinateOfOpponentsAttack) ||
        isAlreadyHit
      ) {
        // don't record anything.
        return "This coordiante already been attacked";
      } else {
        //record a hit or miss
        let hitOrMiss =
          this.coordinatesOfMyShips[coordinateOfOpponentsAttack] ==
            "unoccupied" ||
          this.coordinatesOfMyShips[coordinateOfOpponentsAttack] == "miss"
            ? "miss"
            : "hit";

        switch (hitOrMiss) {
          case "miss":
            //record miss on both coordiantesOfMyShips and missedAttacks key
            this.coordinatesOfMyShips[coordinateOfOpponentsAttack] = "miss";
            //
            this.receivedMissedAttacks.push(coordinateOfOpponentsAttack);
            break;
          case "hit":
            //
            this.coordinatesOfMyShips[coordinateOfOpponentsAttack][0].hit(
              this.coordinatesOfMyShips[coordinateOfOpponentsAttack][1]
            );
            break;

          default:
            break;
        }

        //return value for testing.
        return hitOrMiss;
      }

      /** 
       food for thought for future me...
       should hits and misses be recorded for the enemy
       who fired the shots too?
       if so how and how would I test that?
       "
       * in battle ship there are four "gameboards"/grids
       * two for each player.
       * each player gets a grid for placing there ships
       * and another grid for recording there hits and misses
       * to the opponent
       *
       * should the gameBoard generate 4 grids?
       * 2 for each player and each grid has
       * a type, grid type:ships/opponents's hit's and misses
       * grid type: attack on the opponent's hit's and misses
       *
       * or just 2 grids cause gameBoard will be called
       * and generate grids for each player that calls it
       */
    },

    /**
     * keep track of missed attacks and display them
     * maybe replace missedAttacks key with the
     * a coordiantes object
     */
    receivedMissedAttacks: [],

    //
    displayMissedAttacks() {},

    /**
     * report if all ships have been sunk
     */
    reportIfAllShipsSunk() {
      if (this.armada.every((x) => x.isSunk())) {
        return "all ships in the armada have been sunk";
      } else {
        return "the armada has not been sunk";
      }
    },
  };
}

export default gameBoard;

//for testing?
//module.exports = gameBoard;
