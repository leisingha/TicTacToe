function createPlayer (name, firstBool) {
    const isFirst = () => firstBool;
    return {name, isFirst};
}

function createHumanPlayer (name, firstBool){
    const user = createPlayer(name, firstBool);
    const isHuman = () => {
        return true;
    };
    return Object.assign({}, user, {isHuman});
}

function createComputerPlayer (name, firstBool){
    const {isFirst} = createPlayer(name, firstBool);
    const isHuman = () => {
        return false;
    };
    return {name, isFirst, isHuman};
}

function createCell (i) {
    let state = "";
    const id = i;

    const addVal = (val) => state = val;
    const getState = () => state;
    const getId = () => id;

    return {addVal, getState, getId, id}
}

function GameBoard ()  {
    let boardArray = []

    for (let i = 0; i < 3; i++){
        let row = [];
        for (let j = 0; j < 3; j++){
            let interim = (i==0) ? 0 : (i==1) ? 3 : 6;
            cell = createCell(j + interim)
            row.push(cell)
        }
        boardArray.push(row);
    }

    console.log(boardArray);



    let cellArray = boardArray.flat();

    const modifyCell = (player,cellID) => {
        if(player.isFirst()){
            if(cellArray[cellID].getState() == ""){
                cellArray[cellID].addVal('X');
                domController.markCell('X', cellID);
                return true;
            }else{
                console.error('Cell is already occupied. Please Try again!');   
                return false 
            }
        }else{
            if(cellArray[cellID].getState() == ""){
                cellArray[cellID].addVal('O');
                domController.markCell('O', cellID);
                return true;
            }else{
                console.error('Cell is already occupied. Please Try again!');   
                return false;    
            }
        }
    }

    const generateMove = (player) =>{
        const availableCells = cellArray.filter((cell) => cell.getState() == "");
        console.log(availableCells);
        if(availableCells.length == 0){
            return;
        }
        const availableCellsID = availableCells.map((cell) => cell.getId());
        // console.log(availableCellsID);
        const index = Math.floor(Math.random() * (availableCellsID.length));

        const cellID = availableCellsID[index];

        console.log(cellID, cellArray[cellID].getState());

        modifyCell(player, cellID);
    }

    const allCellMarked = () =>{
        return cellArray.every((cell) => {
            return cell.getState() != "";
        })
    }

    function allCellEqual(outerArray) {
        let streak = false;
        outerArray.forEach(innerArray => {
            if(innerArray.every((cell) =>{
                return cell.getState() == 'X';
            })){ 
                streak = true;
            }else if(innerArray.every((cell) =>{
                return cell.getState() == 'O';
            })){
                streak = true;
            }
        });
        return streak;
    }

    const isStreak =() => {
    
        //check horizontal streak
        let horizontalStreak = allCellEqual(boardArray);

        //check vertical streak
        let col1 = [boardArray[0][0], boardArray[1][0], boardArray[2][0]], col2 = [boardArray[0][1], boardArray[1][1], boardArray[2][1]], col3 = [boardArray[0][2], boardArray[1][2], boardArray[2][2]];
        const columns = [col1, col2, col3];
        let verticalStreak = allCellEqual(columns);

        //check diagonal streak
        let diagonal1 = [boardArray[0][0], boardArray[1][1], boardArray[2][2]];
        let diagonal2 = [boardArray[0][2], boardArray[1][1], boardArray[2][0]];
        let diagonals = [diagonal1, diagonal2];
        let diagonalStreak = allCellEqual(diagonals);

        return (horizontalStreak || verticalStreak || diagonalStreak)
    }

    return{isStreak, modifyCell, allCellMarked, generateMove} //removed getBoard()
}

function gameController () {

    let numMoves = 0;
    const board = GameBoard();
    let players = []

    const setPlayers = (p1,p2) =>{
        players = [p1,p2];
    }

    const playRound = (cellID) =>{

        if(board.isStreak()){
            return;
        }


        const player = ((numMoves%2) == 0) ? players[0] : players[1];

        if(player.isHuman()){
            board.modifyCell(player, cellID) ? null : null; //playerMove(player);
        }else{
            board.generateMove(player);
        }
        
        
     
        // board.getBoard();
        if (board.isStreak() && ((numMoves%2) == 0)){
            // console.log('GAME OVER!!!'); //Add result message!
            domController.generateResult('p1');
        }else if (board.isStreak() && ((numMoves%2) == 1)){
            domController.generateResult('p2');
        }else if(board.allCellMarked() && !board.isStreak()){
            domController.generateResult('tie');
        }
        numMoves++;
    }



    return {playRound, setPlayers}
}

function ScreenController () {
    const game = gameController();

    // const board = GameBoard();

    const form = document.querySelector('#playerType');

    const grid = document.createElement('div');
    grid.classList.add('grid-container');

    const main = document.querySelector('main');

    const createGrid = () =>{
        for (let i = 0; i < 9; i++){
            const cell = document.createElement('div');
            cell.classList.add('cell' + i);
            cell.dataset.id = i;
            cell.addEventListener('click', () =>{
                game.playRound(cell.dataset.id);
            })
            grid.appendChild(cell);
        }

        main.appendChild(grid);
    }

    const resetForm = () =>{
        main.removeChild(form);
    }

    const markCell = (val, cellID) =>{
        const cell = document.querySelector('.cell'+cellID)
        const cross = document.createElement('img');
        cross.setAttribute('src', 'assets/cross.svg')
        const circle = document.createElement('img');
        circle.setAttribute('src', 'assets/circle.svg')

        
        cell.appendChild((val=='X') ? cross : circle);
        
    }

    const generateResult = (val) =>{
        const human = document.createElement('img');
        human.setAttribute('src', 'assets/human.svg')

        const human2 = document.createElement('img');
        human2.setAttribute('src', 'assets/human2.svg')

        const robot = document.createElement('img');
        robot.setAttribute('src', 'assets/robot.svg')

        const tie = document.createElement('img');
        tie.setAttribute('src', 'assets/tie.svg')

        const result = document.createElement('div');
        result.classList.add('result');

        switch (val){
            case 'p1':
                result.textContent = `Player 1 has won the game!`;
                result.appendChild(human);
                break;
            case 'p2':
                result.textContent = `Player 2 has won the game!`;
                result.appendChild(robot);
                break;
            default:
                result.textContent = 'The game is tie!'
                result.appendChild(tie);
        }

        main.classList.add('change-layout')
        main.appendChild(result);
    }

    form.addEventListener('submit', (e) => {
                        e.preventDefault();
                        const formData = new FormData(form);
                        const data = Object.fromEntries(formData.entries());

                        const playerFirst = (data['player1'] == 'human') ? createHumanPlayer('Player 1', true) : createComputerPlayer('Player 1', true);
                        const playerSecond = (data['player2'] == 'human') ? createHumanPlayer('Player 2', false) : createComputerPlayer('Player 2', false);
                        game.setPlayers(playerFirst, playerSecond);

                        resetForm();
                        createGrid();       
                        })

    return {markCell, generateResult}

}

const domController = ScreenController();







    

