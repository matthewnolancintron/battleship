const ship = require("./ship");
function gameBoard() {
  return {
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
    coordinates: Object.fromEntries(
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
     * TODO:implement this function check comments
     * for building
     */
    placeShip(lengthOfShip, startingCoordinate, directionOfPlacement) {
      //create a ship with length = lengthOfShip
      let ship = ship(lengthOfShip);

      //need to update the coordiantes
      //find coords
      if (directionOfPlacement == "horizontal") {
        /**
         * if placeing the ship horizontally
         * then the letter will stay the same
         * but the number will update
         * if placing ship of length 2
         * at a(1) then end location will be
         * a(3) and the coordiantes of placment
         * will be [a(1),a(2),a(3)]
         * coords = from letter(x) to letter(x+ship.length)
         * use this data structure to keep in the bound of
         * the gameBoard [1,2,3,4,5,6,7,8,9,10]
         * or just use a condtional to keep less than or
         * equal to 10.
         * also check if there is already a ship
         * on any of the coords found
         * if not then update those coords
         * with ... not sure yet.
         * also going to assume that the starting
         * location when placing ship horizontally
         * is the ship's left most side such that
         * the rest of the ship is being place to the
         * right of that coordinate.
         */
      } else if (directionOfPlacement == "vertical") {
        /**
         * if vertical then when traversing
         * the board to place the ship
         * the number stays the same
         * like d2 as a starting point would
         * still have (someletter)2 as an end point
         * I could assume that all ships being placed
         * vertically are having the bottom of the ship
         * placed on the startingCoordiante such that
         * the rest of the ship is being placed above that
         * cooridante so the letter just have to be incremented
         * if length of ship is 3 and starting point is at letter
         * g then it will go up to letter I g(x) to i(x)
         * use ['A','B','C','D','E','F','G','H','I','J']
         * this data structure to traverse x steps up
         * from the start to find the end point and each
         * inbetween along the way to the end point
         * add those coords to a secondary array
         * then loopthrough them to update the
         * coordiantes key in the game board
         * will need to have error handleing for
         * when the ship can't be place
         * due to position and length of ship
         * it will happen when looping through the
         * letters array above
         * also need to check the second array of
         * filled with coordiantes to see if
         * those cooridnates are already occupied
         *
         * what should the update value be?
         * -a reference to the ship that lives there?
         *
         */
      }
      /**
       * user can only click in a single
       * sqaure on the board to place the
       * ship the only other option
       * is to rotate to place horizontally
       * or vertically.
       * from a starting locatin like
       * a5 or g2 and the orientation
       * horizational or vertical
       * plus the number of coordinates
       * the ship will occupie based on
       * it's length. I need to figure
       * out a general soultion to find
       * those cooridnates and then up
       * date them in a way that reflects
       * that a ship is there
       * and if that spot is already occupied
       * it should'nt let the ship be placed
       * also if the ship being turned cause
       * it to not be placed on the grid
       * due to postion and it's length conflicting
       * it shouldn't be placed
       */
    },

    /**
    * receiveAttack function:
    * takes a pair of coordinates
    * determines if the attack hit a ship
    * sends hit function to the correct ship
    * or records the coordinates of the missed shot
    todo: implement the method
        */
    receiveAttack(coordPair) {
      /**
       * inspect the coordPair in the
       * coordiantes of the gameBoard
       * if coordiantes has a "(maybe a ref to a ship instance)"
       * call that ship's hit function if not
       * record the missed shot... to where?
       *
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
       */
    },

    /**
     * keep track of missed attacks and display them
     * maybe replace missedAttacks key with the
     * a coordiantes object
    */
    missedAttack:[],

    //
    displayMissedAttacks(){
        /**
         * need to make a second second grid object
         * similar to coordiantes for recording
         * hit's or misses on the Enemy
         */
    },
    

    /**
    * report if all ships have been sunk
    */
    allShipsSunk(){
        //
    },
  };
}

module.exports = gameBoard;
