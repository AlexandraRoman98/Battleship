import { ANSI } from "./utils/ansi.mjs";
import KeyBoardManager, { print, clearScreen, printCentered } from "./utils/io.mjs";
import SplashScreen from "./game/splash.mjs";
import createMenu from "./utils/menu.mjs";
import createMapLayoutScreen from "./game/mapLayoutScreen.mjs";
import createInBetweenScreen from "./game/inBetweenScreen.mjs";
import createBattleshipScreen from "./game/battleshipsScreen.mjs";
import { setLanguage, t } from "./utils/dictionary.mjs";
import { FIRST_PLAYER, SECOND_PLAYER } from "./consts.mjs";

let currentState = null;
let gameLoop = null;

const REQUIRED_COLUMNS = 80;
const REQUIRED_ROWS = 24;

function checkResolution() {
    const { columns, rows } = process.stdout;
    if (columns < REQUIRED_COLUMNS || rows < REQUIRED_ROWS) {
        clearScreen();
        printCentered(`Minimum required: ${REQUIRED_COLUMNS}x${REQUIRED_ROWS}\n`);
        printCentered(`Current size: ${columns}x${rows}\n`);
        printCentered(`Please resize your terminal and press Enter to continue.`);

        process.stdin.once("keypress", checkResolution);
        return false;
    }
    return true;
}

function initialize() {
    print(ANSI.HIDE_CURSOR);
    clearScreen();

    if (checkResolution()) {
        initializeMainMenu();
    }
}

function initializeMainMenu() {
    const mainMenu = createMenu([
        { text: t("start_game"), action: transitionToMapLayout },
        { text: t("select_board_size"), action: () => transitionTo(selectBoardSizeMenu()) },
        { text: t("exit_game"), action: () => process.exit() }
    ]);

    SplashScreen.next = mainMenu;
    currentState = SplashScreen;
    gameLoop = setInterval(update, 1000 / 60);
}

function selectBoardSizeMenu() {
    return createMenu([
        { text: t("board_small"), action: () => setBoardSize(8) },
        { text: t("board_medium"), action: () => setBoardSize(10) },
        { text: t("board_large"), action: () => setBoardSize(12) }
    ]);
}

function setBoardSize(size) {
    // Assuming setBoardSize is a function that sets the board size
    GAME_BOARD_DIM = size;
    initializeMainMenu();
}

function transitionToMapLayout() {
    const mapLayoutScreen = createMapLayoutScreen();

    mapLayoutScreen.init(FIRST_PLAYER, () => {
        const inBetweenScreen = createInBetweenScreen(
            t("next_player_prompt", { player: "Player 2" }), 
            () => {
                const player2Layout = createMapLayoutScreen();
                player2Layout.init(SECOND_PLAYER, createBattleshipScreen);
                return player2Layout;
            }
        );
        currentState = inBetweenScreen;
    });
    currentState = mapLayoutScreen;
}

function transitionTo(newState) {
    currentState = newState;
}

function update() {
    currentState.update();
    currentState.draw();

    if (currentState.transitionTo) {
        currentState = currentState.next;
        clearScreen();
    }
}

function gameOverScreen(winningPlayer) {
    return {
        isDrawn: false,
        update: function () {
            if (KeyBoardManager.isEnterPressed()) {
                initializeMainMenu();
            }
            if (KeyBoardManager.isEscapePressed()) {
                process.exit();
            }
        },
        draw: function () {
            if (!this.isDrawn) {
                this.isDrawn = true;
                clearScreen();
                printCentered(t("win_message", { player: winningPlayer }));
            }
        }
    };
}

initialize();