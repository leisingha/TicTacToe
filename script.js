function createPlayer (name) {
    const turn = false;
    const changeTurn = () => turn = !turn;
    const isTurn = () => turn;
    return {name, changeTurn, isTurn};
}

function createHumanPlayer (name){
    const user = createPlayer(name);
    const getAction = () => prompt('Enter X or O');
    return Object.assign({}, user, {getAction});
}

function createComputerPlayer (name){
    const {name, changeTurn, isTurn} = createPlayer(name);
    const getAction = () => prompt('Enter X or O');
    return {name, changeTurn, isTurn, getAction};
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

    const getBoard = () => boardArray;

    const modifyCell = (pos, val) => boardArray[pos].addVal(val);

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

    const isStreak = () => {
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

    return{getBoard, modifyCell, isStreak}
}

function gameController () {
    const player1 = createHumanPlayer('Lei');
    const player2 = createComputerPlayer('AI');

    const roundTurn = () => 
}


    

