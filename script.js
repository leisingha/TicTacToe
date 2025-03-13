function createPlayer (name) {
    const turn = false;
    const changeTurn = () => turn = !turn;
    const isTurn = () => turn;
    return {name, changeTurn, isTurn};
}

function createHumanPlayer (name){
    const user = createPlayer(name);
    const getPosition = () => {
        const input = prompt('Pick Cell (format: [row][col])');
        const match = input.match(/\[(\d+)\]\[(\d+)\]/);
        if (match) {
            const row = parseInt(match[1], 10);
            const col = parseInt(match[2], 10);
            return { row, col };
        } else {
            alert('Invalid format. Please enter in the format [row][col]');
            return getPosition();
        }
    };
    return Object.assign({}, user, {getPosition});
}

function createComputerPlayer (name){
    const {name, changeTurn, isTurn} = createPlayer(name);
    const getPosition = () => {
        const input = prompt('Pick Cell');
        return input;
    };
    return {name, changeTurn, isTurn, getPosition};
}

function createCell () {
    const state = null;

    const addVal = (val) => state = val;
    const getState = () => state;

    return {addVal, getState}
}


function GameBoard ()  {
    let boardArray = []
    for (let i = 0; i < 3; i++){
        let row = [];
        for (let j = 0; j < 3; j++){
            cell = createCell()
            row.push(cell)
        }
        boardArray.push(row);
    }

    const getBoard = () => console.log(boardArray);

    const modifyCellX = (pos) => {
        boardArray[pos].addVal('X');
    }

    const modifyCellO = (val) => {
        boardArray[pos].addVal('O');
    }

    function allCellEqual(outerArray) {
        let streak = false;
        outerArray.forEach(innerArray => {
            if(innerArray.every((cell) =>{
                cell.getState() == 'X';
            })){ 
                streak = true;
            }else if(innerArray.every((cell) =>{
                cell.getState() == 'O';
            })){
                streak = true;
            }
        });
        return streak;
    }

    const isStreak =() => {
        let streak = false;
        //check horizontal streak
        streak = allCellEqual(boardArray);

        //check vertical streak
        let col1 = [boardArray[0][0], boardArray[1][0], boardArray[2][0]], col2 = [boardArray[0][1], boardArray[1][1], boardArray[2][1]], col3 = [boardArray[0][2], boardArray[1][2], boardArray[2][2]];
        const columns = [col1, col2, col3];
        streak = allCellEqual(columns);

        //check diagonal streak
        let diagonal1 = [boardArray[0][0], boardArray[1][1], boardArray[2][2]];
        let diagonal2 = [boardArray[0][2], boardArray[1][1], boardArray[2][0]];
        let diagonals = [diagonal1, diagonal2];
        streak = allCellEqual(diagonals);

        return streak;
    }

    return{getBoard, modifyCellX, modifyCellO, isStreak}
}

function gameController () {
    const player1 = createHumanPlayer('Lei');
    const player2 = createComputerPlayer('AI');

    const board = GameBoard();

    const playGame = () => {
        while (!board.isStreak){
            playRound();
        }
    }

   

    const playRound = () => {
        //p1 turn
        player1.changeTurn();
        board.modifyCellX(player1.getPosition());
        player1.changeTurn();
        board.getBoard();
        if (board.isStreak){
            console.log('GAME OVER!!!');
        }

        //p2 turn
        player2.changeTurn();
        board.modifyCellO(player2.getPosition());
        player2.changeTurn();
        board.getBoard();
        if (board.isStreak){
            console.log('GAME OVER!!!');
        }

    }

    return {playGame}
}


    

