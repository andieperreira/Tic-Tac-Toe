const tiles = document.querySelectorAll(".tile");
const player_x = "X";
const player_o = "O";
let turn = player_x;

const boardState = Array(tiles.length);
boardState.fill(null);

const strike = document.getElementById("strike");
const gameOver = document.getElementById("game-over");
const gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");
playAgain.addEventListener("click", startNewGame);

tiles.forEach((tile) => tile.addEventListener("click", tileClick));

function tileClick(event){
    if (gameOver.classList.contains("visible")){
        return;
    }

    const tile = event.target;
    const tileNum = tile.dataset.index;

    if (tile.innerText != ""){
        return;
    }

    if (turn == player_x){
        tile.innerText = player_x;
        boardState[tileNum - 1] = player_x;
        turn = player_o;
    }

    else{
        tile.innerText = player_o;
        boardState[tileNum - 1] = player_o;
        turn = player_x;
    }
    checkWinner();
}

function checkWinner(){
    for (const winningCombo of winningCombos){
        const {combo, strikeClass} = winningCombo;
        const tileValue1 = boardState[combo[0] - 1];
        const tileValue2 = boardState[combo[1] - 1];
        const tileValue3 = boardState[combo[2] - 1];

        if (tileValue1 != null &&
            tileValue1 == tileValue2 &&
            tileValue1 == tileValue3)

        {
            strike.classList.add(strikeClass);
            gameOverScreen(tileValue1);
            return;
        }
    }

    //if no winner then end game
    const allTileFilled = boardState.every((tile) => tile != null);

    if (allTileFilled){
        gameOverScreen(null);
    }
}

function gameOverScreen(winnerText){
    gameOver.className = "visible";
}

//restarting game and setting everything back to null
function startNewGame(){
    strike.className = "strike";
    gameOver.className = "hidden";
    boardState.fill(null);
    tiles.forEach((tile) => (tile.innerText = ""));
    turn = player_x;
}

const winningCombos = [
    {combo: [1, 2, 3], strikeClass: "strike-row-1"},
    {combo: [4, 5, 6], strikeClass: "strike-row-2"},
    {combo: [7, 8, 9], strikeClass: "strike-row-3"},

    {combo: [1, 4, 7], strikeClass: "strike-col-1"},
    {combo: [2, 5, 8], strikeClass: "strike-col-2"},
    {combo: [3, 6, 9], strikeClass: "strike-col-3"},

    {combo: [1, 5, 9], strikeClass: "strike-diagonal-1"},
    {combo: [3, 5, 7], strikeClass: "strike-diagonal-2"}
]