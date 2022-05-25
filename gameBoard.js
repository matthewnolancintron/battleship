const ship = require('./ship');
function gameBoard(){
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
        coordinates:Object.fromEntries(['A','B','C','D','E','F','G','H','I','J'].map(letter => Array.from(Array(10).keys(), x => [`${letter}${x+1}`,'unoccupied'])).flat(1)),
    }
    /**
     * ability to place ships
     * at specific coordinates 
     * by calling the ship factory function
     */

    /**
     * receiveAttack function:
     * takes a pair of coordinates
     * determines if the attack hit a ship
     * sends hit function to the correct ship
     * or records the coordinates of the missed shot
     */

    /**
     * keep track of missed attacks and display them
     */

    /**
     * report if all ships have been sunk
     */
}

module.exports = gameBoard;