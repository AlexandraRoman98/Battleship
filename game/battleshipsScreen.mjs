import { GAME_BOARD_DIM, FIRST_PLAYER, SECOND_PLAYER } from "../consts.mjs";
import { print, clearScreen } from "../utils/io.mjs";
import KeyBoardManager from "../utils/io.mjs";  
const createBattleshipScreen = (player1Board, player2Board) => {
    let currentPlayer = FIRST_PLAYER;  
    let cursorRow = 0;  
    let cursorCol = 0;  
    let isDrawn = false;  

    function swapPlayers() {
        currentPlayer = currentPlayer === FIRST_PLAYER ? SECOND_PLAYER : FIRST_PLAYER;
    }

    return {
        init: function (p1Board, p2Board) {
            player1Board = p1Board;
            player2Board = p2Board;
        },

        update: function () {
            if (KeyBoardManager.isUpPressed()) cursorRow = Math.max(0, cursorRow - 1);
            if (KeyBoardManager.isDownPressed()) cursorRow = Math.min(GAME_BOARD_DIM - 1, cursorRow + 1);
            if (KeyBoardManager.isLeftPressed()) cursorCol = Math.max(0, cursorCol - 1);
            if (KeyBoardManager.isRightPressed()) cursorCol = Math.min(GAME_BOARD_DIM - 1, cursorCol + 1);

            if (KeyBoardManager.isEnterPressed()) {

                let opponentBoard = currentPlayer === FIRST_PLAYER ? player2Board : player1Board;

               
                if (opponentBoard.target[cursorRow][cursorCol] === 0) {
                    let hit = opponentBoard.ships[cursorRow][cursorCol] ? "X" : "O"; 
                    opponentBoard.target[cursorRow][cursorCol] = hit;  

                    if (this.isGameOver(opponentBoard)) {
                        print(`Player ${currentPlayer === FIRST_PLAYER ? 1 : 2} wins!`);
                        return;
                    }

                    swapPlayers();
                    isDrawn = false;  
                }
            }
        },

        isGameOver: function (board) {
            for (let row = 0; row < GAME_BOARD_DIM; row++) {
                for (let col = 0; col < GAME_BOARD_DIM; col++) {
                    if (board.ships[row][col] && board.target[row][col] !== "X") {
                        return false;  
                    }
                }
            }
            return true;  
        },

        draw: function () {
            if (isDrawn) return;
            isDrawn = true;
            clearScreen();

            let opponentBoard = currentPlayer === FIRST_PLAYER ? player2Board : player1Board;
            let output = `Player ${currentPlayer === FIRST_PLAYER ? 1 : 2}'s turn:\n`;

            output += '  ';
            for (let i = 0; i < GAME_BOARD_DIM; i++) {
                output += ` ${String.fromCharCode(65 + i)} `;  
            }
            output += '\n';

            for (let row = 0; row < GAME_BOARD_DIM; row++) {
                output += `${String(row + 1).padStart(2, ' ')} `;  
                for (let col = 0; col < GAME_BOARD_DIM; col++) {
                    
                    let cell = opponentBoard.target[row][col] || "~";
                    output += ` ${cell} `;
                }
                output += '\n';
            }

            print(output);  
        }
    };
}

export default createBattleshipScreen;