const player = require('./player');

const humanPlayer = player('human');
const aIPlayer = player('A.I');

test('players can take turns attacking each other', ()=>{
    const spyOnHumanPlayerToogleTurn = jest.spyOn(humanPlayer,"toggleIsPlayersTurn");
    const spyOnAIPlayerToogleTurn = jest.spyOn(aIPlayer,"toggleIsPlayersTurn");

    const spyOnHumanPlayerAttack = jest.spyOn(humanPlayer,"attackEnemyGameBoard");
    const spyOnAIPlayerAttack = jest.spyOn(aIPlayer,"randomAttackOnEnemyGameBoard");


    //set it to the human players turn
    let isHumanPlayerTurn = humanPlayer.toggleIsPlayersTurn();
    
    expect(spyOnHumanPlayerToogleTurn).toHaveBeenCalled();
          
    expect(isHumanPlayerTurn).toStrictEqual(true);

    //attack with human player
    const attackWithHuman = humanPlayer.attackEnemyGameBoard('B3');

    expect(spyOnHumanPlayerAttack).toHaveBeenCalled();

    expect(attackWithHuman).toStrictEqual('B3');

    //send attack to enemy which takes back a hit or miss
    //use that info to update the coordinatesOfEnemyShips
    //on the humanplayer gameboard object

    /**
     * create a function that updates
     * the cooridantes with hit's or misses
     */

    let hitOrMiss = aIPlayer.playersBoard.receiveAttack(humanPlayer.attackEnemyGameBoard('A2'));
    console.log('hit or miss',hitOrMiss);
    //humanPlayer.playersBoard.updateCoordinatesOfEnemyShips(coordiante that was attacked,and if it was a hit or miss);
    //updates the value from unoccupied to a hit or miss.

    //toogle turn off for human

    isHumanPlayerTurn = humanPlayer.toggleIsPlayersTurn();

    expect(isHumanPlayerTurn).toStrictEqual(false);

    //set ai turn on
    let isAITurn = aIPlayer.toggleIsPlayersTurn();

    expect(spyOnAIPlayerToogleTurn).toHaveBeenCalled();

    expect(isAITurn).toStrictEqual(true);

    //attack with AI
    let aiAttack = aIPlayer.randomAttackOnEnemyGameBoard();

    expect(spyOnAIPlayerAttack).toHaveBeenCalled();

    expect(aIPlayer.attackCoordinateLog.includes(aiAttack)).toStrictEqual(true);
    
});