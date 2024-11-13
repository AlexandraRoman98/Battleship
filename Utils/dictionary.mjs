const languageState = {
    selectedLanguage: "en",
};

const translations = {
    en: {
        start_game: "Start Game",
        exit_game: "Exit Game",
        select_board_size: "Select Board Size",
        controls: "Controls",
        game_over: "Game Over",
        press_enter_to_continue: "Press Enter to Continue",
        error_invalid_target: "Invalid Target",
        board_small: "Small (8x8)",
        board_medium: "Medium (10x10)",
        board_large: "Large (12x12)",
        move_cursor: "Arrow keys / WASD: Move cursor",
        rotate_ship: "R: Rotate ship",
        place_ship: "Enter: Place ship",
        enter_or_escape: "Enter: Start | Esc: Exit",
        hit: "Hit!",
        miss: "Miss!",
        win_message: "{player} wins!",
        next_player_prompt: "{player}'s turn next",
        tutorial: "Welcome to Battleships!\n\n1. Use Arrow Keys or WASD to navigate.\n2. Press 'R' to rotate ships during placement.\n3. Press Enter to confirm ship placement or target selection.\n\nPress Enter to Return to Main Menu.",
    },
    ro: {
        start_game: "Începe Jocul",
        exit_game: "Ieși din Joc",
        select_board_size: "Selectează Dimensiunea Tablei",
        controls: "Controale",
        game_over: "Joc Terminat",
        press_enter_to_continue: "Apasă Enter pentru a Continua",
        error_invalid_target: "Țintă Invalidă",
        board_small: "Mic (8x8)",
        board_medium: "Mediu (10x10)",
        board_large: "Mare (12x12)",
        move_cursor: "Tastele săgeată / WASD: Mută cursorul",
        rotate_ship: "R: Rotește nava",
        place_ship: "Enter: Plasează nava",
        enter_or_escape: "Enter: Începe | Esc: Ieși",
        hit: "Lovit!",
        miss: "Ratat!",
        win_message: "{player} câștigă!",
        next_player_prompt: "Urmează {player}",
        tutorial: "Bine ai venit la Battleships!\n\n1. Folosește tastele săgeată sau WASD pentru a naviga.\n2. Apasă 'R' pentru a roti navele în timpul plasării.\n3. Apasă Enter pentru a confirma plasarea navei sau selecția țintei.\n\nApasă Enter pentru a reveni la meniul principal.",
    }
};

function setLanguage(language) {
    if (translations[language]) {
        languageState.selectedLanguage = language;
    }
}

function t(key, variables = {}) {
    let text = translations[languageState.selectedLanguage][key] || key;
    for (const variable in variables) {
        text = text.replace(`{${variable}}`, variables[variable]);
    }
    return text;
}

export { setLanguage, t, languageState };