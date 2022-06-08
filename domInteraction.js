function domInteractions(human, AI) {
  /**
          display both the player’s 
          boards and render them using
          information from the Gameboard class. 
    */
  return {
    //playerType for development only
    displayGameBoardForPlayer(player, playerType) {
      /*
      make 2 grids:
      one for player ships
      other for attacking enemy ships
      */

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

      //conditionals for playerType is for development only
      if (playerType == "human") {
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

        /**
         * add grids to correct location in the DOM
         */
        document.getElementById("gridOfHumansShips").append(gridForPlayerShips);
        document
          .getElementById("gridOfHumansEnemysShips")
          .append(gridForAttacksOnEnemyShips);
      }

      if (playerType == "A.I") {
        /**
         * A.I ships will be placed randomly automatically
         * with out a button press
         */

        document.getElementById("gridOfAIsShips").append(gridForPlayerShips);
        document
          .getElementById("gridOfAIEnemysShips")
          .append(gridForAttacksOnEnemyShips);
      }
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
  console.log("generate grid?");
  let gridContainer = document.createElement('div');
  gridContainer.classList.add('gridContainer')
  /**
   * top row horizonatal is labeled a-j
   * vertical column off to the left is labeled 1-10
   */
  let gridColumnLabels = [];
  let gridRowLabels = [];
  let gridCoordiantes = [];
  //letters are the columns
  [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
  ].forEach(c=>{
    let gridColumnLabel = document.createElement('p');
    gridColumnLabel.textContent = c;
    gridColumnLabel.setAttribute('data-column', c);
    
    //todo add class
    gridColumnLabel.classList.add('gridColumnLabel');

    gridColumnLabel.style.gridArea = `${c}`;

    gridColumnLabels.push(gridColumnLabel);

    //generate cells
    Array.from(Array(10).keys(),x=>x+1).forEach(r=>{
      let gridCoordiante = document.createElement('div');
      
      //todo add class 
      gridCoordiante.classList.add('gridCoordiante');
      
      //
      gridCoordiante.setAttribute('data-coordiante', `${c}${r}`);

      gridCoordiante.style.gridArea = `${c}${r}`;

      gridCoordiantes.push(gridCoordiante);
    });  
  });
  
  //numbers are the rows
  Array.from(Array(10).keys(),x=>x+1).forEach((x,i)=>{
    let gridRowLabel = document.createElement('p');
    gridRowLabel.textContent = x;
    
    //todo add class
    gridRowLabel.classList.add('gridRowLabel');

    gridRowLabel.setAttribute('data-row',x);

    gridRowLabel.style.gridArea = `X${x}`;

    gridRowLabels.push(gridRowLabel);
  });

  // console.log(gridColumnLabels);
  // console.log(gridRowLabels);
  // console.log(gridCoordiantes);

  gridColumnLabels.forEach(c=>{
    gridContainer.append(c);
  });

  gridRowLabels.forEach(r=>{
    gridContainer.append(r);
  });

  gridCoordiantes.forEach(x => {
    gridContainer.append(x);
  });

  return gridContainer;
};

function addShipPlacementOption(){
  
}

export default domInteractions;
