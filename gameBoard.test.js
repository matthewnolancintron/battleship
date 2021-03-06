const gameBoard = require('./gameBoard');



let playersGameBoard = gameBoard();

/** Gameboards should be able to place ships
 *  at specific coordinates by calling the ship
 *  factory function.
 * 
 * todo: could add more tests for this case:
 * 
 */
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
});



/**
 * 2:Gameboards should have a receiveAttack function
 *  that takes a coordiante,
 *  determines whether or not the attack hit 
 *  a ship and then sends the ‘hit’ function
 *  to the correct ship,
 *  or records the coordinates of the missed shot.
 * 
 * possible return values:
 * This coordiante already been attacked
 * or
 * hit 
 * or
 * miss
 */
 test('record hit or misses on your ships from receivedAttack method',()=>{
    const spy = jest.spyOn(playersGameBoard,'receiveAttack');


    const isHitOrMissAtA5 = playersGameBoard.receiveAttack('A5');
    const isHitOrMissA52nd = playersGameBoard.receiveAttack('A5');
    const isHitOrMissA2 = playersGameBoard.receiveAttack('A2')

    expect(spy).toHaveBeenCalled();
      
    expect(isHitOrMissAtA5).toStrictEqual('hit');
  
    expect(isHitOrMissA52nd).toStrictEqual('This coordiante already been attacked');
  
    expect(isHitOrMissA2).toStrictEqual('miss')

});

/**
 * gameboards should be able
 * to report whether or not
 * all of their ships have been sunk.
 */
 test('test reportIfAllShipsSunk method',()=>{
    const spy = jest.spyOn(playersGameBoard,'reportIfAllShipsSunk');

    //all ship should not be sunk
    const isAllShipsSunk = playersGameBoard.reportIfAllShipsSunk();

    expect(spy).toHaveBeenCalled();
      
    expect(isAllShipsSunk).toStrictEqual('the armada has not been sunk');

    // hit all positions for each ship in the armada sinking all ships
    playersGameBoard.armada.forEach(x=>Object.keys(x.positions).forEach(key=>x.positions[key] = 'hit'));

    const allShipsAreSunk = playersGameBoard.reportIfAllShipsSunk();

    expect(allShipsAreSunk).toStrictEqual('all ships in the armada have been sunk');
});