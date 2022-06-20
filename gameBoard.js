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
     * place ship in random position
     *
     */
    placeShip(lengthOfShip, startingCoordinate, directionOfPlacement, type) {
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

        //start coord == 4
        //length of ship == 2
        //4 + (2-1)
        //end coord == 5
        //?4 --> ?5
        //or
        //start coord 3
        //length of ship 5
        //3 + (5-1)
        //end coord == 7
        //?3 --> ?7, 3,4,5,6,7 5 positions used
        //splice is exclusive to the end index so need to go over
        //the end by 1 by not subtracting one from the lengthOfShip
        //example above would be:
        //start coord 3
        //length of ship 5
        //3 + 5
        //end coord == 8
        //3? --> ?7
        //since splice doesn't included the end which is ?8
        //it count up to 1 before the end in this caes ?7

        //find end point
        calculatedEndCoordinate = startingCoordianteNumber + (lengthOfShip);

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
          console.log(lengthOfShip,'lengthOfShip');
          calculatedCoordinateRange = Array.from(Array(10).keys(), (x) => x + 1)
            .slice(startingCoordianteNumber, calculatedEndCoordinate)
            .map((x) => `${startingCoordinate.split("")[0]}${x}`);
            console.log('horizontal coord range',calculatedCoordinateRange);
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

        /**
         * check for out of bounds:
         * due to position and length of ship
         */
        if (calculatedEndCoordinate > 10) {
          isOutOfBounds = true;
        }

        if (isOutOfBounds) {
          console.log("out of bounds");
          return "out of bounds ship can't be placed there";
        } else {
          //update calcualtedCoordrange to be only of size == shipLength
          calculatedCoordinateRange = Array.from(Array(10))
            .map((e, i) => i + 65)
            .map((x) => String.fromCharCode(x))
            .slice(startingCoordianteLetterPosition)
            .map((x) => `${x}${startingCoordinate.split("")[1]}`);
          console.log("vertical coord range", calculatedCoordinateRange);
        }
      }

      /**
       * check if there is already a ship
       * on any of the coords found
       * if each location is unoccupied
       * then place ship replace unoccupied
       * with using  ship(lengthOfShip)
       */
      console.log(calculatedCoordinateRange.length, "coord range.length");
      console.log(lengthOfShip, "ship.length");
      console.log("------------------------------");
      /**
       * if coordiante range is less than or
       * not equal to ships length than
       * return ship can't fit.
       */
      if (calculatedCoordinateRange.length != lengthOfShip) {
        return "ship can't fit";
      }

      /**
       * make sure there is at least
       * one unit of free space around grid unit
       *
       * check all of the ship in question's coordiantes
       * in the coordiante range
       *
       * for each coordiante check the coordinate
       * to the left or right / above or below it
       * if any of those location are occupied then
       * return an error message do this on the first
       * coordiante on the first condition that is true
       *
       * ['A','B','C','D','E','F','G','H','I','J']
       * [1,2,3,4,5,6,7,8,9,10]
       * check perimeter of ship:
       *
       * if coord letter is A can only count up
       * if coord letter is J can only count down
       *
       * if coord number is 1 can only count up
       * if coord number is 10 can only count down
       *
       */
      console.log(this.coordinatesOfMyShips,'coordiantes');

      /**
       * take a long time to set up ships on board
       * possible never get to place all ships
       * will place some ships 
       * 
       * possible reasons:
       * just takes a long time to find an open spot to place a ship
       * could reduce time by only making coordiante ranges equal to the length of
       * the ship being made that would be one less thing to have to redo for
       * 
       * once certain ships have been placed into certain coordiantes the other
       * ships no matter where it tries to place them will be able to fit so
       * in retries on an infinite loop.
       * ... not sure how to solve that issuse just yet.
       * 
       * rather than random coordiante ranges
       * have depleting pool of coordiante ranges
       * that as ships are placed
       * 
       *  have a set pool of coordiante ranges
       * 
       * currently working on creating coordiante range of size == lengthOfShip only
       * to reduce amount of retry placements
       * 
       * next is to update possibility pools
       * as ship is place remove coordiantes that the ship was placed onto
       * from the possible coordiante of placements also subtract the coordiante
       * that are around the perimeter of the ship from the possible cooridantes of placements
       * so a ships are placed update the dataStructure that has the possible coordiantes of placement
       * to choose from so that only possible placements are available from the 
       * possiblity pool 
       * 
       * if the program can place all ships successivly then save that state as 
       * a unique identity in a dataStructure like a set that can' have duplicates
       * 
       * if the process reaches a point where a ship can't be placed 
       * redo, but also keep track of placements  that led to the dead-end state
       * use that info such that next time that time of attemp wont be made
       * 
       * 
       * 
       */
      if (directionOfPlacement == "vertical") {
        /**
         * - only check above and below the first and last coordiante
         *   expections to A,J with above and below checks
         *
         *  -check to the left and right of each coordiante
         *  expection to 1,10 with left and right checks
         */
        let doesEachCoordHaveSpace = calculatedCoordinateRange.every((coord, index, coords) => {
          console.log(this.coordinatesOfMyShips[coord],'coord on grid v');
          //first chord
          if (index == 0) {
            /**
             * for the first coordinate;
             *-if possible (any letter expect A)
             *check one letter above the first coordiante
             */

            //if letter of coord is not A
            if (coord.split("")[0] != "A") {
              //check the coord one letter before
              // | number stays the same

              //letter math:
              // String.fromCharCode?
              //charCodeAt
              /**
               * find char code for the letter
               * using letter.charCodeAt(0)
               * then subtract by 1 to find the charCode
               * for the letter before it
               *
               * use that as input for
               * String.fromCharCode to get the letter
               */

              //building coordinate to check
              let theLetterBefore = String.fromCharCode(
                coord.split("")[0].charCodeAt(0) - 1
              );

              let coordAbove = theLetterBefore + coord.split("")[1];

              if (this.coordinatesOfMyShips[coordAbove] != "unoccupied") {
                console.log(`need at least one space above coord ${coord}`);
                
                console.log(`coord is ${coord}`, `coord above is ${coordAbove}`);

                return false;
              } 
            }
          }

          //first last and everything in between
          /**
           * for the first coordiante to the last do:
           *   check to the left and right of each coord:
           *      -if possible (any number expect 1) check to it's
           *      left (minus 1)
           *      -if possible(any number expect 10) check
           *      to it's right(plus 1)
           */

          //check left of coord
          if (coord.split("")[1] != 1) {
            let numberBefore = Number(coord.split("")[1]) - 1;
            let coordToTheLeft = coord.split("")[0] + numberBefore;

            if (this.coordinatesOfMyShips[coordToTheLeft] != "unoccupied") {
              console.log(`need at least one space to the left of coord ${coord}`);

              console.log(`coord is ${coord}`, `coord to the left is ${coordToTheLeft}`);
              return false;
            }
          }

          //check right of coord
          if (coord.split("")[1] != 10) {
            let numberAfter = Number(coord.split("")[1]) + 1;
            let coordToTheRight = coord.split("")[0] + numberAfter;

            if (this.coordinatesOfMyShips[coordToTheRight] != "unoccupied") {
              console.log(`need at least one space to the right ${coord}`);

              console.log(`coord is ${coord}`, `coord to the right is ${coordToTheRight}`);
              return false;
            }
          }

          //last cord
          if (index == coords.length - 1) {
            /**
             *  for the last coordiante:
             *    -if possible (any letter expect J)
             *    check one letter below the last coordiante
             */
            if (coord.split("")[0] != "J") {
              //building coordinate to check
              let theLetterAfter = String.fromCharCode(
                coord.split("")[0].charCodeAt(0) + 1
              );

              let coordBelow = theLetterAfter + coord.split("")[1];

              if (this.coordinatesOfMyShips[coordBelow] != "unoccupied") {
                console.log(`need at least one space below of coord ${coord}`);

                console.log(`coord is ${coord}`, `coord below is ${coordBelow}`);
                return false;
              }
            }
          }

          //all condition above were not met so return true coord has space around it
          console.log(coord,'has space');
          return true;
        });

        console.log(doesEachCoordHaveSpace);
        if(doesEachCoordHaveSpace == false){
          return "doesn't have at least one grid unit of free space around perimeter of the ship"
        }
      }

      if (directionOfPlacement == "horizontal") {
        /**
         * * if all coord letters are the same horizonatal placement
         * only check left and right for the first and last coord
         * and check above and below for each coord
         * with expections to A,J with above and below checks
         * and expection to 1,10 with left and right checks
         */
        let doesEachCoordHaveSpace = calculatedCoordinateRange.every((coord, index, coords) => {
          console.log(this.coordinatesOfMyShips[coord],'coord on grid h');
          //
          if (index == 0) {
            /**
             * for the first coordinate;
             *      -if possible (any number expect 1)
             *       check one number to the left of the first coordiante
             */
            if (coord.split("")[1] != 1) {
              let numberBefore = Number(coord.split("")[1]) - 1;
              let coordToTheLeft = coord.split("")[0] + numberBefore;

              if (this.coordinatesOfMyShips[coordToTheLeft] != "unoccupied") {
                console.log(`need at least one space to the left of coord ${coord}`);
                console.log(`coord is ${coord}`, `coord left is ${coordToTheLeft}`);
                return false;
              }
            }
          }

          //
          /**
           *  for the first coordiante to the last do:
           *    check to the above and below of each coord:
           *      -if possible (any letter expect A) check above by 1
           *      -if possible(any letter expect J) check below by 1
           *
           */

          //check above with exception
          if (coord.split("")[0] != "A") {
            //building coordinate to check
            let theLetterBefore = String.fromCharCode(
              coord.split("")[0].charCodeAt(0) - 1
            );

            let coordAbove = theLetterBefore + coord.split("")[1];

            if (this.coordinatesOfMyShips[coordAbove] != "unoccupied") {
              console.log(`need at least one space above coord ${coord}`);
              console.log(`coord is ${coord}`, `coord above is ${coordAbove}`);
              return false;
            }
          }

          //check below with exception
          if (coord.split("")[0] != "J") {
            //building coordinate to check
            let theLetterAfter = String.fromCharCode(
              coord.split("")[0].charCodeAt(0) + 1
            );

            let coordBelow = theLetterAfter + coord.split("")[1];

            if (this.coordinatesOfMyShips[coordBelow] != "unoccupied") {
              console.log(`need at least one space below coord ${coord}`);
              console.log(`coord is ${coord}`, `coord below is ${coordBelow}`);
              return false;
            }
          }

          //
          if (index == coords.length - 1) {
            /**
             *
             *  for the last coordiante:
             *    -if possible (any number expect 10)
             *    check one number to the right.
             */
            if (coord.split("")[1] != 10) {
              let numberAfter = Number(coord.split("")[1]) + 1;
              let coordToTheRight = coord.split("")[0] + numberAfter;

              if (this.coordinatesOfMyShips[coordToTheRight] != "unoccupied") {
                console.log(`need at least one space to the right of coord ${coord}`);
                console.log(`coord is ${coord}`, `coord right is ${coordToTheRight}`);
                return false;
              }
            }
          }

          console.log(coord,'has space')
          return true;
        });

        console.log(doesEachCoordHaveSpace);

        if(doesEachCoordHaveSpace == false){
          return 'not enough space around ship'
        }
      }

      let shipToPlace = ship(lengthOfShip, type, calculatedCoordinateRange);
      let isUnocupied = calculatedCoordinateRange.every(
        (x) => this.coordinatesOfMyShips[x] == "unoccupied"
      );

      if (isUnocupied) {
        /**placing ship in coordinatesOfMyShips
         * a reference to the shipToPlace will be
         * available at each coordiante it's located
         */
        let positionOfShipNumber = 0;
        console.log(calculatedCoordinateRange, "coord range");
        calculatedCoordinateRange.forEach(
          //place the ship and it's position
          (x) => {
            console.log(positionOfShipNumber, "pos of ship num");
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
