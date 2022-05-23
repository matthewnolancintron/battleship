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

 */

/** 
 *     number:class length
     * 1 	Carrier 	5
       2 	Battleship 	4
       3 	Destroyer 	3
       4 	Submarine 	3
       5 	Patrol Boat 	2 
*/
   

const ship = require('./ship');

const Destroyer = ship(3);

test('testing the hit method of a ship',()=>{
    const spy = jest.spyOn(Destroyer,'hit');
    const randomPosIRange = Math.floor(Math.random() * Destroyer.length);
    //hit a random position that is within the range of the ships length
    const isHit = Destroyer.hit(randomPosIRange);

    expect(spy).toHaveBeenCalled();
    expect(isHit).toBe(`marking position number ${randomPosIRange} as hit`);
    
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