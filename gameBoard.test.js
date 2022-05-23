const gameBoard = require('./gameBoard');

test('not sure what to test or how',()=>{
    expect(gameBoard()).toBe();
})

/**
 * possible tests:
 * 
 * 1:Gameboards should be able to place ships
 *  at specific coordinates by calling the ship
 *  factory function.
 * 
 * 2:Gameboards should have a receiveAttack function
 *  that takes a pair of coordinates,
 *  determines whether or not the attack hit 
 *  a ship and then sends the ‘hit’ function
 *  to the correct ship,
 *  or records the coordinates of the missed shot.
 * 
 * 3:Gameboards should keep track of
 *  missed attacks so they can display them properly.
 * 
 * 4:Gameboards should be able
 *  to report whether or not
 *  all of their ships have been sunk.
 * 
 */