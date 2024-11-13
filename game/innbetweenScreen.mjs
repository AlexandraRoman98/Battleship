import { print, printCenterd } from "../utils/io.mjs";

function createInnBetweenScreen() {
    return {
        isDrawn: false,
        next: null,
        transitionTo: null,
        displayTime: 0,
        text: null,
        transitionFn: null,

        init: function (text, transitionFn, displayTime = 3000) {
            this.displayTime = displayTime;
            this.text = text;
            this.transitionFn = transitionFn;
        },

        update: function (dt) {
          this.displayTime -= dt;
           
          if (this.displayTime <= 0 && this.onTransition) {
            this.onTransition();
            } else {
            }
        },
        

        draw: function (dr) {
            if (this.isDrawn == false) {
                this.isDrawn = true;
                printCenterd(this.text);
            }
        }
    }
}

export default createInnBetweenScreen;