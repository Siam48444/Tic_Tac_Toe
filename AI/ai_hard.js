import { CIRCLE_CLASS, CROSS_CLASS } from "../JS/rules.js";
import { place_the_mark, swap_turn, update_turn_indicator } from "../JS/turns.js";
import { is_draw, is_winner } from "../JS/rules.js";
import { end_the_game, handle_clicks } from "../index.js";


// Minimax Algorithm
function minimax(cells, is_maximizing) {
    if (is_winner(cells, CIRCLE_CLASS)) return 1; //AI wins
    else if (is_winner(cells, CROSS_CLASS)) return -1; // Opponent wins
    else if (is_draw(cells)) return 0; // Draw


    // Get all the available (empty) cells
    const available_cells = [...cells].filter(cell => {
        return !cell.classList.contains(CROSS_CLASS) && !cell.classList.contains(CIRCLE_CLASS);
    });


    // AI's turn (maximize score)
    if (is_maximizing) { 
        let best_score = -Infinity;

        for (let cell of available_cells) {
            cell.classList.add(CIRCLE_CLASS); // Simulate ai move
            let score = minimax(cells, false); // Get score
            cell.classList.remove(CIRCLE_CLASS); // Undo move

            best_score = Math.max(score, best_score); // Update the best score
        }

        return best_score;
    }

    // Opponent's turn (minimize score)
    else {
        let best_score = Infinity;

        for (let cell of available_cells) {
            cell.classList.add(CROSS_CLASS); // Simulate opponent's move
            let score = minimax(cells, true); // Get score
            cell.classList.remove(CROSS_CLASS); // Undo move

            best_score = Math.min(score, best_score); // Update the best score
        }

        return best_score;
    }
}



function get_best_ai_move(cells) {
    let best_score = -Infinity;
    let best_move = null;

    // Get all the available (empty) cells
    const available_cells = [...cells].filter(cell => {
        return !cell.classList.contains(CROSS_CLASS) && !cell.classList.contains(CIRCLE_CLASS);
    });

    // No move if the board is full
    if (available_cells.length === 0) return;

    for (let cell of available_cells) {
        cell.classList.add(CIRCLE_CLASS); // Simulate AI move
        let score = minimax(cells, false);
        cell.classList.remove(CIRCLE_CLASS); // Undo move

        if (score > best_score) {
            best_score = score;
            best_move = cell;
        }
    }
    
    return best_move;
}



export function place_hard_ai_move(cells) {
    const ai_cell = get_best_ai_move(cells);

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
