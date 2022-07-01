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
     *                     ?  1 Carrier 	  5
     * 1 Battleship 	4
     * 2 Destroyer 	  3
     * 3 Submarine  	2
     * 4 Patrol Boat 	1
     *
     *
     */
    shipsOfTheGame: [
      // {
      //   num: 1,
      //   typeOfShip: "Carrier",
      //   length: 5,
      // },
      {
        num: 1,
        typeOfShip: "BattleShip",
        length: 4,
      },
      {
        num: 2,
        typeOfShip: "Destroyer",
        length: 3,
      },
      {
        num: 3,
        typeOfShip: "sumbarine",
        length: 2,
      },
      {
        num: 4,
        typeOfShip: "PatrolBoat",
        length: 1,
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
        calculatedEndCoordinate = startingCoordianteNumber + lengthOfShip;

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
          // console.log(lengthOfShip, "lengthOfShip");
          calculatedCoordinateRange = Array.from(Array(10).keys(), (x) => x + 1)
            .slice(startingCoordianteNumber, calculatedEndCoordinate)
            .map((x) => `${startingCoordinate.split("")[0]}${x}`);
          // console.log("horizontal coord range", calculatedCoordinateRange);
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
          // console.log("out of bounds");
          return "out of bounds ship can't be placed there";
        } else {
          ship;
          calculatedCoordinateRange = Array.from(Array(10))
            .map((e, i) => i + 65)
            .map((x) => String.fromCharCode(x))
            .slice(
              startingCoordianteLetterPosition,
              lengthOfShip + startingCoordianteLetterPosition
            )
            .map((x) => `${x}${startingCoordinate.split("")[1]}`);
          // console.log("vertical coord range", calculatedCoordinateRange);
        }
      }

      /**
       * check if there is already a ship
       * on any of the coords found
       * if each location is unoccupied
       * then place ship replace unoccupied
       * with using  ship(lengthOfShip)
       */
      // console.log(calculatedCoordinateRange.length, "coord range.length");
      // console.log(lengthOfShip, "ship.length");
      // console.log("------------------------------");
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
      // console.log(this.coordinatesOfMyShips, "coordiantes");

      //no overlaping pieces or setting on a pecies permieter
      if(this.alreadyUsedPossibleStartingCoordinates.includes(calculatedCoordinateRange[0])){
        return 'coordiante already been used'
      }

      let perimeterCoordinates = [];

      if (directionOfPlacement == "vertical") {
        /**
         * - only check above and below the first and last coordiante
         *   expections to A,J with above and below checks
         *
         *  -check to the left and right of each coordiante
         *  expection to 1,10 with left and right checks
         */

        let doesEachCoordHaveSpace = calculatedCoordinateRange.every(
          (coord, index, coords) => {
            // console.log(this.coordinatesOfMyShips[coord], "coord on grid v");
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

                /**Diagonal free space check*/
                // console.log(coord.split("")[1] != 1,'coord.split("")[1] != 1',coord.split("")[1], '', coord);
                if (coord.split("")[1] != 1) {
                  //check top left diagonal
                  // then check coordinate one letter and number back
                  let theNumberBefore = Number(coord.split("")[1]) - 1;
                  let topLeftDiagonal = theLetterBefore + theNumberBefore;
                  // console.log(topLeftDiagonal,'topLeft, ', coord, 'coord')


                  if (this.coordinatesOfMyShips[topLeftDiagonal] != "unoccupied") {
                    // console.log(`need at least one space above coord ${coord}`);

                    // console.log(
                    //   `coord is ${coord}`,
                    //   `coord top left diagonal is ${topLeftDiagonal}`
                    // );

                    return false;
                  } else {
                    perimeterCoordinates.push(topLeftDiagonal);
                  }
                }

                if (coord.split("")[1] != 10) {
                  //check top right diagonal
                  // then check coordiante one letter up (previous in alphabet) and one number forward
                  let theNumberAfter = Number(coord.split("")[1]) + 1;
                  let topRightDiagonal = theLetterBefore + theNumberAfter;

                  if (this.coordinatesOfMyShips[topRightDiagonal] != "unoccupied") {
                    // console.log(`need at least one space above coord ${coord}`);

                    // console.log(
                    //   `coord is ${coord}`,
                    //   `coord top left diagonal is ${topRightDiagonal}`
                    // );

                    return false;
                  } else {
                    perimeterCoordinates.push(topRightDiagonal);
                  }
                }

                // center above free space check
                let coordAbove = theLetterBefore + coord.split("")[1];

                if (this.coordinatesOfMyShips[coordAbove] != "unoccupied") {
                  // console.log(`need at least one space above coord ${coord}`);

                  // console.log(
                  //   `coord is ${coord}`,
                  //   `coord above is ${coordAbove}`
                  // );

                  return false;
                } else {
                  perimeterCoordinates.push(coordAbove);
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
                // console.log(
                //   `need at least one space to the left of coord ${coord}`
                // );

                // console.log(
                //   `coord is ${coord}`,
                //   `coord to the left is ${coordToTheLeft}`
                // );
                return false;
              } else {
                perimeterCoordinates.push(coordToTheLeft);
              }
            }

            //check right of coord
            if (coord.split("")[1] != 10) {
              let numberAfter = Number(coord.split("")[1]) + 1;
              let coordToTheRight = coord.split("")[0] + numberAfter;

              if (this.coordinatesOfMyShips[coordToTheRight] != "unoccupied") {
                // console.log(`need at least one space to the right ${coord}`);

                // console.log(
                //   `coord is ${coord}`,
                //   `coord to the right is ${coordToTheRight}`
                // );
                return false;
              } else {
                perimeterCoordinates.push(coordToTheRight);
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

                // bottom diaganal checks
                if(coord.split('')[1] != 1){
                  let theNumberBefore = Number(coord.split("")[1]) - 1;
                  let bottomLeftDiagonal = theLetterAfter + theNumberBefore; 

                  if (this.coordinatesOfMyShips[bottomLeftDiagonal] != "unoccupied") {
                    // console.log(
                    //   `need at least one space below of coord ${coord}`
                    // );
  
                    // console.log(
                    //   `coord is ${coord}`,
                    //   `coord bottomLeftDiagonal is ${bottomLeftDiagonal}`
                    // );
                    return false;
                  } else {
                    perimeterCoordinates.push(bottomLeftDiagonal);
                  }
                  
                }
                
                if(coord.split('')[1] != 10){
                  let theNumberAfter = Number(coord.split("")[1]) + 1;
                  let bottomRightDiagonal = theLetterAfter + theNumberAfter;
                  // console.log(coord,bottomRightDiagonal,'00000')

                  if (this.coordinatesOfMyShips[bottomRightDiagonal] != "unoccupied") {
                    // console.log(
                    //   `need at least one space below of coord ${coord}`
                    // );
  
                    // console.log(
                    //   `coord is ${coord}`,
                    //   `coord bottomLeftDiagonal is ${bottomRightDiagonal}`
                    // );
                    return false;
                  } else {
                    perimeterCoordinates.push(bottomRightDiagonal);
                  }
                }

                //below check
                if (this.coordinatesOfMyShips[coordBelow] != "unoccupied") {
                  // console.log(
                  //   `need at least one space below of coord ${coord}`
                  // );

                  // console.log(
                  //   `coord is ${coord}`,
                  //   `coord below is ${coordBelow}`
                  // );
                  return false;
                } else {
                  perimeterCoordinates.push(coordBelow);
                }
              }
            }

            //all condition above were not met so return true coord has space around it
            // console.log(coord, "has space");
            return true;
          }
        );

        // console.log(doesEachCoordHaveSpace);
        if (doesEachCoordHaveSpace == false) {
          return "doesn't have at least one grid unit of free space around perimeter of the ship";
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
        let doesEachCoordHaveSpace = calculatedCoordinateRange.every(
          (coord, index, coords) => {
            // console.log(this.coordinatesOfMyShips[coord], "coord on grid h");
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

                let theLetterBefore = String.fromCharCode(
                  coord.split("")[0].charCodeAt(0) - 1
                );

                let theLetterAfter = String.fromCharCode(
                  coord.split("")[0].charCodeAt(0) + 1
                );

                // diagonal 
                if(coord.split('')[0] != "A"){
                  let topLeftDiagonal = theLetterBefore + numberBefore;
                  if (this.coordinatesOfMyShips[topLeftDiagonal] != "unoccupied") {
                    // console.log(
                    //   `need at least one space to the 0topleftdiagonal of coord ${coord}`
                    // );
                    // console.log(
                    //   `coord is ${coord}`,
                    //   `topLeftDiagonal is ${topLeftDiagonal}`
                    // );
                    return false;
                  } else {
                    perimeterCoordinates.push(topLeftDiagonal);
                  }
                }

                // check bottomLeft diagonal horizontal check
                if(coord.split('')[0] != 'J'){
                  let bottomLeftDiagonal = theLetterAfter + numberBefore;
                  if (this.coordinatesOfMyShips[bottomLeftDiagonal] != "unoccupied") {
                    // console.log(
                    //   `need at least one space to the 0bottomRight of coord ${coord}`
                    // );
                    // console.log(
                    //   `coord is ${coord}`,
                    //   `bottomLeftDiagonal is ${bottomLeftDiagonal}`
                    // );
                    return false;
                  } else {
                    perimeterCoordinates.push(bottomLeftDiagonal);
                  }
                }


                if (this.coordinatesOfMyShips[coordToTheLeft] != "unoccupied") {
                  // console.log(
                  //   `need at least one space to the left of coord ${coord}`
                  // );
                  // console.log(
                  //   `coord is ${coord}`,
                  //   `coord left is ${coordToTheLeft}`
                  // );
                  return false;
                } else {
                  perimeterCoordinates.push(coordToTheLeft);
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
                // console.log(`need at least one space above coord ${coord}`);
                // console.log(
                //   `coord is ${coord}`,
                //   `coord above is ${coordAbove}`
                // );
                return false;
              } else {
                perimeterCoordinates.push(coordAbove);
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
                // console.log(`need at least one space below coord ${coord}`);
                // console.log(
                //   `coord is ${coord}`,
                //   `coord below is ${coordBelow}`
                // );
                return false;
              } else {
                perimeterCoordinates.push(coordBelow);
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
                let theNumberBefore = Number(coord.split("")[1]) - 1;

                let theLetterBefore = String.fromCharCode(
                  coord.split("")[0].charCodeAt(0) - 1
                );
                let theLetterAfter = String.fromCharCode(
                  coord.split("")[0].charCodeAt(0) + 1
                );

                // check topRight diagonal horizontal check
                if(coord.split('')[0] != "A"){
                  let topRightDiagonal = theLetterBefore + numberAfter;//
                  if (this.coordinatesOfMyShips[topRightDiagonal] != "unoccupied") {
                    // console.log(
                    //   `need at least one space to the left of coord ${coord}`
                    // );
                    // console.log(
                    //   `coord is ${coord}`,
                    //   `topRightDiagonal is ${topRightDiagonal}`
                    // );
                    return false;
                  } else {
                    perimeterCoordinates.push(topRightDiagonal);
                  }
                }

                // check bottomRight diagonal horizontal check
                if(coord.split('')[0] != 'J'){
                  let bottomRightDiagonal = theLetterAfter + numberAfter;
                  if (this.coordinatesOfMyShips[bottomRightDiagonal] != "unoccupied") {
                    // console.log(
                    //   `need at least one space to the left of coord ${coord}`
                    // );
                    // console.log(
                    //   `coord is ${coord}`,
                    //   `bottomRightDiagonal is ${bottomRightDiagonal}`
                    // );
                    return false;
                  } else {
                    perimeterCoordinates.push(bottomRightDiagonal);
                  }      
                }



                let coordToTheRight = coord.split("")[0] + numberAfter;

                if (
                  this.coordinatesOfMyShips[coordToTheRight] != "unoccupied"
                ) {
                  // console.log(
                  //   `need at least one space to the right of coord ${coord}`
                  // );
                  // console.log(
                  //   `coord is ${coord}`,
                  //   `coord right is ${coordToTheRight}`
                  // );
                  return false;
                } else {
                  perimeterCoordinates.push(coordToTheRight);
                }
              }
            }

            // console.log(coord, "has space");
            return true;
          }
        );

        // console.log(doesEachCoordHaveSpace);

        if (doesEachCoordHaveSpace == false) {
          return "not enough space around ship";
        }
      }

      // console.log(
      //   perimeterCoordinates,
      //   "perimeter of ship at",
      //   calculatedCoordinateRange
      // );
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
        // console.log(calculatedCoordinateRange, "coord range");
        calculatedCoordinateRange.forEach(
          //place the ship and it's position
          (x) => {
            // console.log(positionOfShipNumber, "pos of ship num");
            this.coordinatesOfMyShips[x] = [shipToPlace, positionOfShipNumber];
            positionOfShipNumber++;
          }
        );
        // add ship to armada for quick access
        this.armada.push(shipToPlace);

        /*
         * add coords from calculatedCoordianteRange[0] to
         * calculatedCoordianteRange[calculatedCoordianteRange.length-1]
         * to the alreadyused pool
         * then use it to filter out from possible starting pool
         */
        for (let index = 1; index < calculatedCoordinateRange.length; index++) {
          this.alreadyUsedPossibleStartingCoordinates.push(
            calculatedCoordinateRange[index]
          );
        }

        /**
         * TODO:
         * to reduce unsuccessful attempts remove perimeter of free space
         * coords from possible starting coord pool
         *
         * find all coords that make up the
         * perimeter of the ship placed
         *
         * add those coords to the alreadyUsed coord pool
         * and update possible starting coord pool by filtering
         * already used out from possible starting coords.
         */

        //add perimeter coords to alreadyUsed coords
        perimeterCoordinates.forEach((x) => {
          this.alreadyUsedPossibleStartingCoordinates.push(x);
        });

        // console.log(
        //   this.alreadyUsedPossibleStartingCoordinates,
        //   "used coords - successfull placement"
        // );

        //remove already used starting coordiantes from the pool of choices/possibilities
        // possibleStartingCoordiantes = possibleStartingCoordiantes.filter(x=>x!="coord to remove");

        //filter out coords that are already used
        //update possible StartingCoordinates
        this.possibleStartingCoordiantes =
          this.possibleStartingCoordiantes.filter((x) => {
            return this.alreadyUsedPossibleStartingCoordinates.every(
              (a) => a != x
            );
          });

        // console.log(this.possibleStartingCoordiantes);
        // ("possibleStaring coords - successfull placement");

        // console.log("placement succesfull");

        return "placement succesfull";
      } else {
        return "placement is occupied ship can't be place there";
      }
    },

    possibleStartingCoordiantes: [
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
      .flat(1),

    alreadyUsedPossibleStartingCoordinates: [],

    randomiseShipPlacements() {
      //reset possible starting coords and already used coords
      this.possibleStartingCoordiantes = [
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
      this.alreadyUsedPossibleStartingCoordinates = [];

      let possibleDirectionsOfPlacement = ["horizontal", "vertical"];

      for (let pos = 0; pos < this.shipsOfTheGame.length; pos++) {
        // console.log(
        //   `on ship type ${pos + 1} out of ${
        //     this.shipsOfTheGame.length
        //   } ship types`
        // );

        // console.log(this.shipsOfTheGame, "?");
        // console.log(this.shipsOfTheGame[pos], "ship type");
        // console.log(
        //   this.shipsOfTheGame[pos].num,
        //   "num ships",
        //   this.shipsOfTheGame[pos].typeOfShip
        // );

        let shipPlacementNotSucceful = true;

        //place ship.num number of that ship
        for (let index = 0; index < this.shipsOfTheGame[pos].num; index++) {
          // console.log("\n", "\n");
          // console.log(
          //   this.shipsOfTheGame[pos].typeOfShip,
          //   index,
          //   "index----\n\n\n"
          // );
          // console.log("\n");

          // reset shipPlacementNotSucceful boolean for ship placement attempt
          shipPlacementNotSucceful = true;

          while (shipPlacementNotSucceful) {
            //used as a condition for the do while loop
            //will keep trying until attempt is a success
            //then this varible is incremented by
            //ending the attempt loop.

            // console.log('0',index,this.shipsOfTheGame[pos].num);

            //place ship for human
            let shipPlacementAttemptForHuman = "";

            //try to place a ship
            shipPlacementAttemptForHuman = this.placeShip(
              this.shipsOfTheGame[pos].length,
              this.possibleStartingCoordiantes[
                Math.floor(
                  Math.random() * this.possibleStartingCoordiantes.length
                )
              ],
              possibleDirectionsOfPlacement[
                Math.floor(Math.random() * possibleDirectionsOfPlacement.length)
              ],
              this.shipsOfTheGame[pos].typeOfShip
            );

            if (shipPlacementAttemptForHuman == "placement succesfull") {
              // console.log(this.shipsOfTheGame[pos], "was placed!");
              // console.log(
              //   this.shipsOfTheGame[pos].num - (index + 1),
              //   " ",
              //   this.shipsOfTheGame[pos].typeOfShip,
              //   " left to place"
              // );
              shipPlacementNotSucceful = false;
            } else {
              shipPlacementNotSucceful = true;
              // console.log("did not place ship");
            }
          }
        }
      }

      // console.log(this.shipsOfTheGame, "shipsOfTheGame");
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