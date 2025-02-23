import { CIRCLE_CLASS, CROSS_CLASS } from "../JS/rules.js";
import { place_the_mark, swap_turn, update_turn_indicator } from "../JS/turns.js";
import { is_draw, is_winner } from "../JS/rules.js";
import { end_the_game, handle_clicks } from "../index.js";


export function get_easy_ai_move(cells) {
    // Get all available (empty) cells
    const available_cells = [...cells].filter(cell => {
        return !cell.classList.contains(CROSS_CLASS) && !cell.classList.contains(CIRCLE_CLASS);
    });

    // No move if the board is full
    if (available_cells.length === 0) return;

    // Return a random available cell
    return available_cells[Math.floor(Math.random() * available_cells.length)];
}



// Place the easy ai move
export function place_easy_ai_move(cells) {
    const ai_cell = get_easy_ai_move(cells);

    if (ai_cell) {
        place_the_mark(ai_cell, CIRCLE_CLASS);
        ai_cell.removeEventListener("click", handle_clicks); // Prevent user clicks

        const ai_winning_cells = is_winner(cells, CIRCLE_CLASS); // Check if current move is a winning move

        if (ai_winning_cells) {
            end_the_game(true, ai_winning_cells); // End game if there's a winner
            return;
        }
        else if (is_draw(cells)) {
            end_the_game(false); // End game if it's a draw
            return;
        }
        else {
            swap_turn();
            update_turn_indicator();
        }
    }
    else { 
        return; 
    }
}