/**
 * note for testing:
 * REMEMBER you only have to test your object’s
 * public interface.
 * 
 * Only methods or properties that
 * are used outside of your ‘ship’ object
 * need unit tests.
 * 
 * what methods or properties are used outside
 * of the ship object,
 * 
 * the game board has the
 * ability to place ships
   at specific coordinates 
   by calling the ship factory function
   (not implemented yet.)

   The gameBoard can call the hit method
   on a ship instance via the
   receiveAttack function:
     * takes a pair of coordinates
     * determines if the attack hit a ship
     * sends hit function to the correct ship
     * or records the coordinates of the missed shot
    (not implemented yet.)

    not yet aware of any other ways the
    ship instance will be used yet.
    before testing will documents other
    parts of the game to see if other
    parts use or intereact with the props 
    or methods of the ship factory function


 */
const ship = require('./ship');

test('not sure what to test yet?',()=>{
    expect(ship().toBe());    
});

/**
 * possible tests:
 * 
 * 1: test the hit method.
 * Ships should have a hit() 
 * function that takes a number
 *  and then marks that position as ‘hit’.
 * 
 * 2: test the isSunk method:
 * isSunk() should be a function
 * that calculates it based on their 
 * length and whether all of
 * their positions are ‘hit’.
 * 
 * 3:...
 * 
 */