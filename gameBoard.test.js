const gameBoard = require('./gameBoard');



let playersGameBoard = gameBoard();

test('should be able to place ships',()=>{
    const spy = jest.spyOn(playersGameBoard,'placeShip');

    /**
       create a ship of length 2 (Patrol Boat ) and it's
     * placement is horizonal left most of the ship is
     * placed at starting coordiante A5 the rest of the ship
     * will fall on coordiantes to the right of the starting 
     * cooridnate.
     */
    const isShipPlaced = playersGameBoard.placeShip(2,'A5','horizontal');
    
    expect(spy).toHaveBeenCalled();
    
    /**
     * non-succsesfull return values:
     * 
     * if out of bounds will return:
     * "out of bounds ship can't be placed there"
     * 
     * if placement is occupied return value is:
     * "placement is occupied ship can't be place there";
     * 
     * succesfull return value:
     * `placement succesfull'
     * 
     */
    expect(isShipPlaced).toStrictEqual('placement succesfull');
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