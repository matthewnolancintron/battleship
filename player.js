//for testing with jest
//const gameBoard = require("./gameBoard");


import gameBoard from "./gameBoard.js";

function player(type) {
  /*
    turn taking:
    toogle the isPlayerTurn prop
    after completing a move/attack
    and use it to check whose turn it is
  */
  switch (type) {
    case "human":
      //human player object
      return {
        playersBoard: gameBoard(),
        isTurn: false,
        //contains coordiantes that the player already attacked
        attackCoordinateLog: [],
        /**
         * player calls out coordinate of attack
         * on enemy gameBoard attempting to hit
         * an enemy ship
         *
         * return the coordinate of attack
         *
         * should be notified if
         * attack was a hit or miss
         * and update the coordinates
         * of enemyships from the enemy recieve attack
         * method.
         *
         */
        toggleIsPlayersTurn() {
          this.isTurn = !this.isTurn;
          return this.isTurn; 
        },

        attackEnemyGameBoard(coordianteToAttack) {
          /**
           * if attackCoordinateLog does not include
           * coordianteToAttack:
           * add it to the attackCoordianteLog and
           * return coordiante of attack
           */
          if (!this.attackCoordinateLog.includes(coordianteToAttack)) {
            this.attackCoordinateLog.push(coordianteToAttack);
            /**
             * check if ship is at coord
             */
            let infoAtCooridanteOfAttack = this.playersBoard.coordinatesOfEnemyShips[coordianteToAttack]; 
            
            console.log(infoAtCooridanteOfAttack)
            if(infoAtCooridanteOfAttack == "unoccupied"){
              return 'miss';
            }
            

            return coordianteToAttack;
          } else {
            return "coordiante already attacked";
          }
        },
      };
      break;
    case "A.I":
      //AI player Object
      return {
        playersBoard: gameBoard(),
        isTurn: false,
        //contains coordiantes that the player already attacked
        attackCoordinateLog: [],

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
        toggleIsPlayersTurn() {
          this.isTurn = !this.isTurn;
          return this.isTurn;
        },

        randomAttackOnEnemyGameBoard() {
          let coordianteToAttack =   ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
          .map((letter) =>
            Array.from(Array(10).keys(), (x) => [
              `${letter}${x + 1}`,
              "unoccupied",
            ])
          )
          .flat(1);

          coordianteToAttack = coordianteToAttack[Math.random()*(coordianteToAttack.length-1)];

          if (!this.attackCoordinateLog.includes(coordianteToAttack)) {
            this.attackCoordinateLog.push(coordianteToAttack);
            return coordianteToAttack;
          } else {
            return "coordiante already attacked";
          }

        },
      };
      break;

    default:
      break;
  }
}
export default player;

//for testing?
//module.exports = player;