import { choose_O, choose_X } from "./turns.js";



export const score_button_X = document.querySelector(".score_button_X");
export const score_button_O = document.querySelector(".score_button_O");
export const score_X_paragraph = document.querySelector(".score_X");
export const score_O_paragraph = document.querySelector(".score_O");

export let Xscore = 0; // Tracks the score of X
export let Oscore = 0; // Tracks the score of O



// Reset the scores after restarting the game
export function reset_scores() {
    Xscore = 0;
    Oscore = 0;
    score_X_paragraph.innerText = "-";
    score_O_paragraph.innerText = "-";
}



// Update the score after each round
export function update_scores(circle_turn) {
    if (circle_turn) {
        Oscore ++;
        score_O_paragraph.innerText = Oscore;
    }
    else {
        Xscore ++;
        score_X_paragraph.innerText = Xscore;
    }
}



// Disable user turn selection
export function disable_turn_selection() {
    score_button_X.removeEventListener("click", choose_X);
    score_button_O.removeEventListener("click", choose_O);
}