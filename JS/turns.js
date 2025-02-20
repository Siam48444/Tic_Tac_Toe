import { score_button_O, score_button_X } from "./scores.js";
import { click_sound_X, click_sound_O, play_sound, is_muted } from "../Assets/Sounds/sounds.js";
import { CROSS_CLASS } from "../JS/rules.js";



export let circle_turn; // Tracks if it's O's turn



// Get the first turn by the user click
export function get_user_turn() {
    score_button_X.addEventListener("click", choose_X);
    score_button_O.addEventListener("click", choose_O);
}
export function choose_X() { 
    circle_turn = false; 
    update_turn_indicator(); 
}
export function choose_O() { 
    circle_turn = true; 
    update_turn_indicator(); 
}



// Switch turns between X and O
export function swap_turn() { 
    circle_turn = !circle_turn; 
}


// Resets the turn to X
export function reset_turn() {
    circle_turn = false;
}



// Indicate the user turn graphically
export function update_turn_indicator() {
    if (circle_turn) {
        score_button_O.classList.add("active_turn")
        score_button_X.classList.remove("active_turn")
    }
    else {
        score_button_X.classList.add("active_turn")
        score_button_O.classList.remove("active_turn")
    }
}



// Add current player's mark (X or O) to the cell
export function place_the_mark(cell, current_turn) { 
    cell.classList.add(current_turn); // Place the mark to the cell

    // Play the sound of the current mark
    if (current_turn === CROSS_CLASS) {
        play_sound(click_sound_X, is_muted)
    }
    else {
        play_sound(click_sound_O, is_muted);
    }
}