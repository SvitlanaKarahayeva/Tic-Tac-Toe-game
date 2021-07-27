const cells = Array.from(document.querySelectorAll('.cell')); //creating an array of all cells
const playerDisplay = document.querySelector('.display-turns');
const resultsDisplay = document.querySelector('.results');
const resetBtn = document.getElementById('reset');
//playerX and playerO classes that will be used below

let board = ['', '', '', '', '', '', '', '', '']; //will act for the board in the resetButton function
//store the current player
let currentPlayer = 'X';
//game in active state
let isGame = true;

//Possible game results:
const TIE = 'TIE';
const playerX_WON = 'playerX_Won';
const playerO_WON = 'playerO_Won';

//Board of cells' rows and indexes to illustrate winning combinations
/* 
[0] [1] [2] 
[3] [4] [5] 
[6] [7] [8] 
*/

const winningCombinations = [
    //horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //diagonal
    [0, 4, 8],
    [2, 4, 6]
];


//loop thru winCombinations, if one of the cells is an empty string-> continue; if 3 match-> break and announce the winner using announceResults()
function handleResults () {
    let isroundWon = false;
    for(let i = 0; i < 8; i++){
        const winConditions = winningCombinations[i];
        const a = board[winConditions[0]];
        const b = board[winConditions[1]];
        const c = board[winConditions[2]];
        if(a === '' || b === '' || c === ''){
            continue;
        }
        if(a === b && b === c){
            isroundWon = true;
            break;
        }
    }
    if(isroundWon){
        announceResults(currentPlayer === 'X' ? playerX_WON : playerO_WON) 
        isGame = false;
        return;
    }  
    if(!board.includes('')){
        announceResults(TIE);
    }
};

//function checks if the cell has the value or not; if yes-> returns false; if no-> returns true
function isValidAction (cell){
    if(cell.innerText === 'X' || cell.innerText === 'O'){
        return false;
    }
    return true
};

//function helps to make sure that players play only empty tiles in their turns
//sets the value of the board array at the given position to be equal to the value of the current player variable 
function updateBoard (index){
     board[index] = currentPlayer;
};
 
//help function to update the results on the result display using 3 possible game results declared above
function announceResults (result) {
    switch(result){
        case playerX_WON:
            resultsDisplay.innerHTML = 'Player <span class="playerX">X</span> Won';
            break;
        case playerO_WON:
            resultsDisplay.innerHTML = 'Player <span class="playerO">O</span> Won';
            break;
        case TIE:
            resultsDisplay.innerHTML = `It's a TIE`;
    }
    resultsDisplay.classList.remove('hide')
};

//Function shows whose turn is to play on the Turns display
function changePlayer () {
    playerDisplay.classList.remove(`player${currentPlayer}`)
    if(currentPlayer === 'X'){
        currentPlayer = 'O'
    } else {
        currentPlayer = 'X'
    }
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`)

};

//Player clicks on the cell
function playerAction (cell, index){
    if(isValidAction(cell) && isGame)  {
        cell.innerText = currentPlayer;
        cell.classList.add(`player${currentPlayer}`);
        updateBoard(index);
        handleResults();
        changePlayer();
    }
};

// by default starts with 'X' an any time of the reset
function playerXStarts() {  
     if(currentPlayer === 'O'){
        changePlayer();
    }
}
//function to clear the board at any time, also 
function resetBoard (){
    board = ['', '', '', '', '', '', '', '', ''];
    isGame = true;
    resultsDisplay.classList.add('hide');

    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('playerX')
        cell.classList.remove('playerO')
    })
    playerXStarts()
};

//event listener for each cell when player clicks
cells.forEach( (cell, index) => {
    cell.addEventListener('click', () => playerAction(cell, index)); 
});

resetBtn.addEventListener('click', resetBoard)






