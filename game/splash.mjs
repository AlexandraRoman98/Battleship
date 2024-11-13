import { printCentered, clearScreen } from "../utils/io.mjs";
import { t } from "../utils/dictionary.mjs";

const UI = 
`######                                    #####                         
 #     #   ##   ##### ##### #      ###### #     # #    # # #####   ####  
 #     #  #  #    #     #   #      #      #       #    # # #    # #      
 ######  #    #   #     #   #      #####   #####  ###### # #    #  ####  
 #     # ######   #     #   #      #            # #    # # #####       # 
 #     # #    #   #     #   #      #      #     # #    # # #      #    # 
 ######  #    #   #     #   ###### ######  #####  #    # # #       ####  
                                                                         `;

let countdown = 2500;

const SplashScreen = {
    next: null,
    transitionTo: null,

    update(dt) {
        if ((countdown -= dt) <= 0) {
            this.transitionTo = this.next;
        }
    },

    draw() {
        clearScreen();
        printCentered(UI);
        printCentered(`\n${t("enter_or_escape")}`);
    }
}

export default SplashScreen;