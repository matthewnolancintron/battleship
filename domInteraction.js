import player from "./player.js";
import ship from "./ship.js";

/**
 * might move some or all function outside
 * of the domInteraction Object into it
 *
 * start game button should only be clickAble or
 * appear after player confirms ships
 *
 * currently start game button is apart of dom interactions object
 * but confirm ship placement is not
 * there is no way for either to communicate with each other
 * or for main game loop to utilze information/data from
 * confirmed ship placement.
 *
 * there are also other issuse with having functions outside
 * of the return object like less control of game state
 * on certain actions and it's less clean to me
 */

function domInteractions(human, AI) {
  return {
    /**
            display both the player’s 
            boards and render them using
            information from the Gameboard class. 
    */

    //playerType for development only
    displayGameBoardForPlayer(player) {
      /**
      opponets grid that doesn't show any ships
      until the player hits the ship or will display 
      a miss on that grid

      once a ship is hit the turn will stay as the
      players turn until they make another miss 
        
      when oppnenet hits your grid miss will show up
      no your grid too and
      when a ship is hit it will turn red with an x on
      the section of the ship that was hit
        
      misses will turn grey with a black dot

      for testing there will be a section underneath 
      the players grids to show the computer's grids
      after testing hide that part of the display
      or remove it until needed again for testing.
      */

      /**
       * player.playersBoard.coordinatesOfEnemyShips
       * player.playersBoard.coordianteOfMyShips
       */

      let gridForPlayerShips = generateGridElement();
      let gridForAttacksOnEnemyShips = generateGridElement();

      /**
       * add grids to correct location in the DOM
       */
      document.getElementById("gridOfHumansShips").append(gridForPlayerShips);
      document
        .getElementById("gridOfHumansEnemysShips")
        .append(gridForAttacksOnEnemyShips);

      /**
       *
       */
      let gridForAttacksOnEnemyShipsGridCoordinates = document.querySelectorAll(
        "#gridOfHumansEnemysShips>.gridContainer>.gridCoordiante"
      );

      // todo loop over gridForAttacksOnEnemyShipsGridCoordinates and add event to each 'coord'
      console.log(gridForAttacksOnEnemyShipsGridCoordinates);
      gridForAttacksOnEnemyShipsGridCoordinates.forEach((element) => {
        element.addEventListener("click", () => {
          /**
           * attack A.I ships
           * use data from A.I ships to update grid
           * only attack If it's human's turn
           */
          let attackResult = player.attackEnemyGameBoard(
            element.dataset.coordiante
          );

          if (attackResult == "miss") {
            console.log('was miss');
            /**
             * disable oppenets board to make unclickable
             */
            document
              .querySelectorAll(
                "#gridOfHumansEnemysShips>.gridContainer>.gridCoordiante"
              )
              .forEach((element) => {
                element.style.pointerEvents = "none";
              });

            
            // computerPlayer.isTurn = true;

            // end players turn
            player.isTurn = false;

          }
        });
      });

      //add ships to gridForPlayerShips
      /*
       * use generateShipPlacementOptions function
       */
      let shipPlaceMentOptions = generateShipPlacementOptions(player);
      //add shipPlacementOption
      // to gridOfHumansShips container element
      document.getElementById("gridOfHumansShips").append(shipPlaceMentOptions);

      setShipsRandomly(player);
    },
    startGame() {
      return new Promise(function (resolve, reject) {
        let gameStartTriggerButton = document.querySelector(
          ".confirmPlacementButton"
        );

        gameStartTriggerButton.addEventListener("click", () => {
          resolve("");
        });
      });
    },
    placeShips() {},
    
    /**
     * add event listners to gridOfEnemyShips
   * take user input for attacking
   * 
   * For attacks, 
     let the user click on a coordinate
     in the enemy Gameboard.
   */
  };
}

function generateGridElement() {
  let gridContainer = document.createElement("div");
  gridContainer.classList.add("gridContainer");
  /**
   * top row horizonatal is labeled a-j
   * vertical column off to the left is labeled 1-10
   */
  let gridColumnLabels = [];
  let gridRowLabels = [];

  //attach method or event to each coordinate?
  //or just add method to dom object and have
  //dom object get the coordiante?
  let gridCoordiantes = [];

  //letters are the columns
  ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].forEach((c) => {
    let gridColumnLabel = document.createElement("p");
    gridColumnLabel.textContent = c;
    gridColumnLabel.setAttribute("data-column", c);

    //todo add class
    gridColumnLabel.classList.add("gridColumnLabel");

    gridColumnLabel.style.gridArea = `${c}`;

    gridColumnLabels.push(gridColumnLabel);

    //generate cells
    Array.from(Array(10).keys(), (x) => x + 1).forEach((r) => {
      let gridCoordiante = document.createElement("div");

      //todo add class
      gridCoordiante.classList.add("gridCoordiante");

      //
      gridCoordiante.setAttribute("data-coordiante", `${c}${r}`);

      gridCoordiante.style.gridArea = `${c}${r}`;

      gridCoordiantes.push(gridCoordiante);
    });
  });

  //numbers are the rows
  Array.from(Array(10).keys(), (x) => x + 1).forEach((x, i) => {
    let gridRowLabel = document.createElement("p");
    gridRowLabel.textContent = x;

    //todo add class
    gridRowLabel.classList.add("gridRowLabel");

    gridRowLabel.setAttribute("data-row", x);

    gridRowLabel.style.gridArea = `X${x}`;

    gridRowLabels.push(gridRowLabel);
  });

  // console.log(gridColumnLabels);
  // console.log(gridRowLabels);
  // console.log(gridCoordiantes);

  gridColumnLabels.forEach((c) => {
    gridContainer.append(c);
  });

  gridRowLabels.forEach((r) => {
    gridContainer.append(r);
  });

  gridCoordiantes.forEach((x) => {
    gridContainer.append(x);
  });

  return gridContainer;
}

function generateShipPlacementOptions(player) {
  /**
   * add ship placement option for player
   * manual drag and drop or random position button
   * drag in drop is in development so just use random button
   * for now
   * once game starts ship placement buttons are removed
   * from dom until next game/match
   */
  /**
   * create button called randomize placement
   * and another called manual placement
   * place buttons under your grid
   */
  /**
   * randomize placement button:
   * when pressed will generate armada of ship elements
   * from the player object data and then place them onto
   * the correct locaction on the grid element using the
   * player.playersBoard.coordinateOfMyShips data.
   */
  /**
   * manaul placement:
   * when pressed will genereate armada of ship elements
   * from the player object data
   * the ship elements will be placed to the left of the grid
   * for the user to then drag and drop on to the grid located
   * on the right.
   *
   * ship element can only be placed on grid element
   * if it can fit and doesn't intersect other element
   * and must have at least one free space bewtween it
   * and another ship so ships can be touching other ships
   * or bordering each other need at least a gap of one square
   * grid unit between ships before droping onto the grid
   *
   * during the placement of ships the gameboard will only display
   * yourShips grids and the ship elements to be placed
   * opponets grid will not be shown
   *
   * once all ships are placed added to the grid there will be
   * a button under the grid for confirming the placement
   *
   * then the grid with the ships placed as selected by the user
   * will display to the left and then the empty grid for attacks
   * on the opponent wil display to the right and the game
   * will be ready to start.
   */

  let shipPlacementOptionsContainer = document.createElement("div");
  shipPlacementOptionsContainer.classList.add("shipPlacementOptionsContainer");

  let shipPlacementMessage = document.createElement("p");
  shipPlacementMessage.textContent = "How do you want to place your ships?";
  shipPlacementMessage.classList.add("shipPlacementMessage");

  let placeShipsRandomlyOptionButton = document.createElement("button");
  placeShipsRandomlyOptionButton.classList.add("randomPlacementOption");
  placeShipsRandomlyOptionButton.textContent = "randomise";

  let placeShipsManualOptionButton = document.createElement("button");
  placeShipsManualOptionButton.classList.add("manualPlacementOption");
  placeShipsManualOptionButton.textContent = "manual";

  let confirmPlacementButton = document.createElement("button");
  confirmPlacementButton.classList.add("confirmPlacementButton");
  confirmPlacementButton.textContent = "confirm";
  confirmPlacementButton.addEventListener("click", () => {
    //remove placement options from the screen for the rest of the
    //match
    shipPlacementOptionsContainer.remove();

    //set player turn to true or false (random)
    player.isTurn = [true, false][Math.floor(Math.random() * 2)];
  });

  placeShipsRandomlyOptionButton.addEventListener("click", () => {
    setShipsRandomly(player);
  });

  // todo create manual ship placementEvent.
  placeShipsManualOptionButton.addEventListener("click", () => {});

  // add buttons to container
  shipPlacementOptionsContainer.append(shipPlacementMessage);
  shipPlacementOptionsContainer.append(placeShipsRandomlyOptionButton);
  shipPlacementOptionsContainer.append(placeShipsManualOptionButton);
  shipPlacementOptionsContainer.append(confirmPlacementButton);

  //return the container element
  return shipPlacementOptionsContainer;
}

function setShipsRandomly(player) {
  //need to clear placement before randomizing it again.
  player.playersBoard.clearShipPlacements();

  //also need to clear ship elements from the grid.
  let gridElementChildrenElementsArray = Array.from(
    document.querySelector("#gridOfHumansShips>.gridContainer").children
  );

  //clear ships off the grid
  for (
    let index = 0;
    index < gridElementChildrenElementsArray.length;
    index++
  ) {
    let element = gridElementChildrenElementsArray[index];
    if (
      !element.classList.contains("gridCoordiante") &&
      !element.classList.contains("gridColumnLabel") &&
      !element.classList.contains("gridRowLabel")
    ) {
      // console.log(element, "\n\n\n");
      element.remove();
    }
  }

  player.playersBoard.randomiseShipPlacements();

  // console.log(player.playersBoard.armada, "humans ships");
  // console.log(
  //   player.playersBoard.coordinatesOfMyShips,
  //   "placement of ships for human"
  // );

  let shipElements = generateShipElementsOfTheGame(player);
  // console.log(shipElements, "shipElements");
  // console.log(player.playersBoard.coordinatesOfMyShips);

  for (const key in player.playersBoard.coordinatesOfMyShips) {
    if (player.playersBoard.coordinatesOfMyShips[key] != "unoccupied") {
      if (player.playersBoard.coordinatesOfMyShips[key][1] == 0) {
        // console.log("\n\n\n");
        // console.log(player.playersBoard.coordinatesOfMyShips[key], key);
        // console.log("\n\n\n");

        let typeOfShipElement =
          player.playersBoard.coordinatesOfMyShips[key][0].type;

        // console.log(shipElements, "shipElements before splice");
        // console.log(shipElements.length, "length of ship elemetns array");

        //
        let shipNeeded;

        if (shipElements.length > 0) {
          //find location of ship index.
          let indexOfShipNeeded = shipElements.findIndex(
            (ship) => ship.classList[0] == typeOfShipElement
          );

          //move from array and store in variable
          shipNeeded = shipElements.splice(indexOfShipNeeded, 1)[0];
        }

        // console.log(shipElements, "shipElements after splice");
        // console.log(shipNeeded, "shipneeded");

        /**
        use start and end coord of coordRange to figure out
        orientation of ship.

        if they differ by letter but the numbers are the same
       * then it spans vertically

        if they differ by number but letters are the same 
        then is spans horizontally
       */
        let shipsCoordianteRange =
          player.playersBoard.coordinatesOfMyShips[key][0].placement;

        let startCoord = shipsCoordianteRange[0];
        let endCoord = shipsCoordianteRange[shipsCoordianteRange.length - 1];

        let shipsOrientation;

        // console.log(shipsCoordianteRange[0].split("")[0], "startCoord letter");
        // console.log(
        // shipsCoordianteRange[shipsCoordianteRange.length - 1].split("")[0],
        // "endCoord letter"
        // );

        if (
          shipsCoordianteRange[0].split("")[0] ==
          shipsCoordianteRange[shipsCoordianteRange.length - 1].split("")[0]
        ) {
          // console.log(
          // "start and end coord have the same letter and are on the same row placement is horizontal"
          // );
          shipsOrientation = "horizontal";
        } else {
          // console.log(
          // "start and end coord have different letter and are not on the same row ship placement must be vertical"
          // );
          shipsOrientation = "vertical";
        }

        /**
         * 2:use that data to set ship element's
         *   grid area prop like this,
         *   grid-area: <name> | <row-start> / <column-start> / <row-end> / <column-end>;
         *
         *  name = coordiante,
         *  row-start,row-end(horizontal=placementLength),
         *  column-start,column-end(vertialPlacementLength),
         *  can set row-start to coordiante-end or coordiante-start
         *  like A2/start
         *
         * with the following data:
         *  orientation(vertical/horizantioal),
         *  ship length(number),
         *  starting coordiante,
         *  end coordiante,
         */
        if (shipsOrientation == "horizontal") {
          //grid area: startCoordiante/startCoord-start/startCoord-start/endCoord-end
          // console.log(shipNeeded, "horizontal");
          shipNeeded.style.gridArea = `${startCoord}/${startCoord}-start/${startCoord}-start/${endCoord}-end`;
        }

        if (shipsOrientation == "vertical") {
          // grid area: startCoord-start/startCoord-start/endCoord-end/startCoord-start A1-start/A1-start/E1-end/A1-start
          // console.log(shipNeeded, "vertical");
          shipNeeded.style.gridArea = `${startCoord}-start/${startCoord}-start/${endCoord}-end/${startCoord}-start`;
        }

        /**
         * 3:set style so element overlaps the grid:
         *   set the z index to 1 so the elements is an
         *   a layer above the grid.
         *   and make sure the ship has a color show it shows up
         */

        /**
         *  * 4:add all ships into gridOfHumansShips/gridContainer
         * so that each ship would be a sibling of the gridElements
         */
        document
          .querySelector("#gridOfHumansShips>.gridContainer")
          .append(shipNeeded);
      }
    }
  }
}

function generateShipElementsOfTheGame(player) {
  // console.log(player.playersBoard.shipsOfTheGame);
  // console.log(player.playersBoard.armada);
  let shipElements = [];
  player.playersBoard.shipsOfTheGame.forEach((ship) => {
    /**
     * each ship object has the following props
     * typeOfShip prop, string that says the type of ship it is
     * num, represents the number ships to be made of that type
     * length, the size of the ship element the space it takes up on the grid
     */
    //generate num number of ships of type typeOfShip
    for (let index = 0; index < ship.num; index++) {
      //container for sub elements that make up a ship
      let shipElement = document.createElement("div");

      //can be used to make ships look unique from one another
      shipElement.classList.add(`${ship.typeOfShip}`);

      // create sub elements that make up a ship
      for (let index = 0; index < ship.length; index++) {
        let shipPositionElement = document.createElement("div");
        shipPositionElement.classList.add("shipPositionElement");

        //data position:
        //to help with placement on grid
        //tracking when hit or not, to update styles
        shipPositionElement.setAttribute("data-position", index);

        // add component to shipElement
        shipElement.append(shipPositionElement);
      }

      // add ship to array
      shipElements.push(shipElement);
    }
  });
  return shipElements;
}

export default domInteractions;
