import player from "./player.js";
import domInteractions from "./domInteraction.js";
//const ship = require("./ship");
//const gameBoard = require("./gameBoard");

(function gameLoop() {
  //intial game set up start
  /**
   * should only do once per game
   *
   * could put steps into a conditional
   * that way it only happens once per game
   */

  //create players
  let humanPlayer = player("human");

  /**
   * todo:optional
   * polish the intelligence of
   * the computer player by
   * having it try adjacent
   * slots after getting a ‘hit’.
   */
  let computerPlayer = player("A.I");


  /**
   * ideas for toogle turn loop
   * create ref to players in the domInteractions object
   * such that at the end of human's miss can toggle
   * other players turn to on after turning humans off
   * 
   * or make it such that players have refrences to each other
   * and can toogle each others turns on an off
   */

  // console.log("create players", humanPlayer, computerPlayer);

  //populate gameBoards for both players
  // console.log(humanPlayer.playersBoard, "humansBoard");
  // console.log(computerPlayer.playersBoard, "computers board");

  //todo might move creation
  //of ships types to the ship module somehow.
  //or create second helper module for ship type
  //and how many there are in the game?

  /**
   * could move to the player or gameBoard modules
   * and add method for creating ship types for player
   * to then place or machine to auto place.
   */

  /**
   * could make the randomized ship placement
   * a feature of the game if a player would like
   * to set up ships on the board in a randomized
   * fashion and still use it for A.I ship placement.
   *
   * feature:
   * a button to placeships in random order for player
   *
   * moving random ship placement to the gameBoardObject
   * as a method. to be called here from the player object
   *
   * *might decople the gameBoardObject from the player Object
   */

  //this should be able to be called multiple times
  humanPlayer.playersBoard.randomiseShipPlacements();

  //this is called once for the A.I
  computerPlayer.playersBoard.randomiseShipPlacements();

  //check players aramdas
  // console.log(humanPlayer.playersBoard.armada, "humans ships");
  // console.log(
  // humanPlayer.playersBoard.coordinatesOfMyShips,
  // "placement of ships for human"
  // );

  // console.log(computerPlayer.playersBoard.armada, "AI ships");
  // console.log(
  // computerPlayer.playersBoard.coordinatesOfMyShips,
  // "placement of ships for A.I"
  // );
  //end of intial game set up

  //rest of the game loop takes place in this event.
  document.addEventListener("DOMContentLoaded", () => {
    //create domInteractionsObject for access to methods
    //for dom manipulation in the gameLoop
    let domInteractionObject = domInteractions();

    /**
     * render ships and grids and add dom interactions
     */
    domInteractionObject.displayGameBoardForPlayer(humanPlayer, "human");

    // set AI board:
    //domInteractionObject.setBoardForAI(computerPlayer, "A.I");

    /**
     * need to update coordinatesOfEnemyShips
     * for both human and AI
     *
     * todo: keep this data updated and synced
     */
    humanPlayer.playersBoard.coordinatesOfEnemyShips =
      computerPlayer.playersBoard.coordinatesOfMyShips;
    computerPlayer.playersBoard.coordinatesOfEnemyShips =
      humanPlayer.playersBoard.coordinatesOfMyShips;

    //
    console.log(humanPlayer, "check the human player");
    console.log(computerPlayer, "check the computer player");

    /**
     * game starts when human player
     * confirms ship placement options
     *
     * add eventListner to confirm ship placement button
     * to start game when placement is confirmed
     */
    let whenGameStarts = domInteractionObject.startGame();

    whenGameStarts.then(() => {
      //give dom object reference to players
      domInteractionObject.playerReferences.human = humanPlayer;
      domInteractionObject.playerReferences.computer = computerPlayer;

      //start turn loop
      domInteractionObject.playerTurnLoop();
    });
  });
})();