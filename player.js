function player(type) {
  switch (type) {
    case "human":
      //human player object
      return {
        /**
         * what properties and methods
         * should the human player have
         *
         * Properties:
         * create an association between the player
         * and the gameBoard
         * Each player gets one gameBoardObject
         * store gameBoardObject as a key on the player object
         *
         * should I create a key for keeping track of players turn?
         *
         * methods:
         * //ability to attack the Enemy gameBoard
         * attackEnemyGameBoard();
         * //maybe a method to set turn to finished?
         * //maybe add more method if needed later.
         *
         */
      };
      break;
    case "AI":
      //AI player Object
      return {
        /**
         * what properties and methods
         * should the AI player have
         *
         * about the same as the human player expect
         * the attack enemy ship method is different
         * in that it will hit random legal moves
         * and human will play what is selected
         * or passed in to the function from the person
         * playing.
         */
        /**
         * The game is played against the computer,
         *  so make ‘computer’ players capable of
         *  making random plays.
         *  The AI does not have to be smart,
         * but it should know whether or
         *  not a given move is legal.
         *  (i.e. it shouldn’t shoot
         *  the same coordinate twice).
         */
        //ability to attack the Enemy gameBoard
      };
      break;

    default:
      break;
  }

  /**
   * Players can take turns
     *playing the game by attacking
    the enemy Gameboard.

    how to implement turn taking?
     */
}
module.exports = player;
