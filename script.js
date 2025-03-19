function createPlayer (name, firstBool) {
    const isFirst = () => firstBool;
    return {name, isFirst};
}

function createHumanPlayer (name, firstBool){
    const user = createPlayer(name, firstBool);
    const getPosition = () => {
        const input = prompt('Pick Cell');
        return input
    };
    return Object.assign({}, user, {getPosition});
}

function createComputerPlayer (name, firstBool){
    const {isFirst} = createPlayer(name, firstBool);
    const getPosition = () => {
        const input = prompt('Pick Cell');
        return input;
    };
    return {name, isFirst, getPosition};
}

function createCell (i) {
    let state = "";
    const id = i;

    const addVal = (val) => state = val;
    const getState = () => state;
    const getId = () => id;

    return {addVal, getState, getId}
}


function GameBoard ()  {
    let boardArray = []
    for (let i = 0; i < 3; i++){
        let row = [];
        for (let j = 0; j < 3; j++){
            let interim = (i==0) ? 0 : (i==1) ? 2 : 5;
            cell = createCell(j + interim)
            row.push(cell)
        }
        boardArray.push(row);
    }

    let cellArray = boardArray.flat();

    const getBoard = () => {
        boardArray.forEach(row => {
            console.log(row.map(cell => cell.getState()));
        });
    };

    const modifyCell = (player,cellID) => {
        if(player.isFirst()){
            if(cellArray[cellID].getState() == ""){
                cellArray[cellID].addVal('X');
                return true;
            }else{
                console.error('Cell is already occupied. Please Try again!');   
                return false 
            }
        }else{
            if(cellArray[cellID].getState() == ""){
                cellArray[cellID].addVal('O');
                return true;
            }else{
                console.error('Cell is already occupied. Please Try again!');   
                return false;    
            }
        }
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

    return{getBoard, modifyCellX, modifyCellO, isStreak, modifyCell}
}

function gameController () {
    const player1 = createHumanPlayer('Lei', true);
    const player2 = createHumanPlayer('Priyam', false);

    const players = [player1, player2];
    
    const playerMove = (player) =>{
        const playerInput = player.getPosition();

        if (player == players[1]){
            board.modifyCell(players[1], playerInput) ? null : playerMove(player);
        }else{
            board.modifyCell(players[0], playerInput) ? null : playerMove(player);
        }
        
        board.getBoard();
        if (board.isStreak()){
            console.log('GAME OVER!!!');
        }
    }

    const board = GameBoard();

    const playRound = () => {
        //p1 turn
        playerMove(player1);

        //forfiet p2 turn if steak exists
        if (board.isStreak()){
            return;
        }else{
            //p2 turn
            playerMove(player2);
        }

    }

    const playGame = () => {
        board.getBoard();
        while(!board.isStreak()){
            playRound();
        }
    }

    return {playGame}
}

function ScreenController(){
    const game = gameController();

    const board = GameBoard();

    const form = document.querySelector('#playerType');

    const grid = document.createElement('div');

    const main = document.querySelector('main');

    for (let i = 0; i++; i<9){
        const cell = document.createElement('div');
        cell.classList.add('cell' + i);
        cell.dataset.id = i;
        cell.addEventListener('click', () =>{
            
        })
        grid.appendChild(cell);
    }

    


    form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const playerFirst = (data['player1'] == 'human') ? createHumanPlayer('Player 1') : createComputerPlayer('Player 1');
    const playerSecond = (data['player2'] == 'human') ? createHumanPlayer('Player 2') : createComputerPlayer('Player 2');

    game.playGame()
    })

    const resetForm = () =>{
        main.removeChild(form);
    }


    
}

ScreenController();



const game = gameController();

// game.playGame();




    

