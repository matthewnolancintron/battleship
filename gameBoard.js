const ship = require("./ship");
function gameBoard() {
  return {
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
    placeShip(lengthOfShip, startingCoordinate, directionOfPlacement) {
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
          startingCoordianteLetterPosition + lengthOfShip;

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
      let shipToPlace = ship(lengthOfShip);
      let isUnocupied = calculatedCoordinateRange.every(
        (x) => this.coordinatesOfMyShips[x] == "unoccupied"
      );

      if (isUnocupied) {
        /**placing ship in coordinatesOfMyShips
         * a reference to the shipToPlace will be
         * available at each coordiante it's located
         */
        let positionOfShipNumber = 0;
        calculatedCoordinateRange.forEach(
          //place the ship and it's position
          (x) => {
            this.coordinatesOfMyShips[x] = [
              shipToPlace,
              shipToPlace.positions[positionOfShipNumber],
            ];
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

    /**
     * assumes all ship have already been placed

    * receiveAttack function:
    * takes a coordinates
    * determines if the attack hit a ship
    * sends hit function to the correct ship
    * or records the coordinates of the missed shot
    */

    receiveAttack(coordinateOfOpponentsAttack) {
      /**
       * first check missedAttacks to see
       * if it's a previous miss or the shot
       * has already been hit before.
       * 
       *Inspect the coordinateOfOpponentsAttack
       *in coordinatesOfMyShips 
        
       If coordinate is unoccupied: record the miss
       to both the coordinateOfMyShips and missedAttacks

       If coordiante is occupied:
         call that ship's hit function passing in 
         the position of the ship that was hit.
          * record the missed shot
         * at the coordinateOfOpponentsAttack
         * in coordinatesOfMyShips.

         coordiante that have a ships contain an object
         which first
       **/

      /**does attack coordinate already contains a miss
      coordinates that already
       contain a miss or already fired on can't be fired on
       again.
          */
      if (this.missedAttacks.includes(coordinateOfOpponentsAttack)) {
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
            this.missedAttacks.push(coordinateOfOpponentsAttack);
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
    missedAttacks: [],

    //
    displayMissedAttacks() {
      /**
       * need to make a second second grid object
       * similar to coordiantes for recording
       * hit's or misses on the Enemy
       */
    },

    /**
     * report if all ships have been sunk
     */
    reportIfAllShipsSunk() {
      /**
       * could look through the coordiantes that
       * contain the players ships and find all ships
       * on that grid and check if each ship found
       * is sunk or not by checking it's prop hasBeenSunk
       * or create a key on the gameBoard that contains
       * all ships placed and just call a . every or some
       * other array method to see if all element in it
       * pass the condtion of hasBeenSunk = false
       * if(this.shipsArray.every((x)=>{x.hasBeenSunk == false})){
       *  all ships have been sunk game over...
       * report...?
       * }
       */
    },
  };
}

module.exports = gameBoard;
