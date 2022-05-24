function ship(length) {
  return {
    length: length, //number

    //where they've been hit?
    /**
     * genereate an object with number of keys
     * equal to length (of ship) keys names are from 0 to length
     * with each key being assigned a default value of 'notHit' (could change to false) 
     * does this by generating an array of numbers that has length number of elements
     * each element is then made into a sub array through
     * the second argument passed to Array.from()
     * the second argument passed into Array.from is an arrow function that is called
     * on each element in the array being generated it returns an array
     * with two element the first is the value of the element that the arrow function is being a called on 
     * and the second element is a default value of 'notHit'
     * the result is an array of length number of elements
     * where each element is another array containing two elements
     * first = the key or number, second = the default value ('notHit')
     * That list of key value pairs is turned into an object with
     * with Object.fromEntries.
     */
    positions: Object.fromEntries(Array.from(Array(length).keys(), x => [x,'notHit'])),

    hasBeenSunk: false, //bool

    hit(postionNumber) {
        this.positions[postionNumber] = 'hit';
        return this.positions;
    }, //mark a position as hit,


    isSunk: () => {
      return "fake value";
    }, //calculate based on ship length, and if all of it's positions are hit
  };
}
module.exports = ship;
