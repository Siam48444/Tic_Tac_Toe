import { CIRCLE_CLASS, CROSS_CLASS } from "../JS/rules.js";
import { place_the_mark, swap_turn, update_turn_indicator } from "../JS/turns.js";
import { is_draw, is_winner } from "../JS/rules.js";
import { end_the_game, handle_clicks } from "../index.js";

// Minimax Algorithm
function minimax(cells, depth, isMaximizing) {
    if (is_winner(cells, CIRCLE_CLASS)) return 10 - depth; // AI wins
    if (is_winner(cells, CROSS_CLASS)) return depth - 10; // Opponent wins
    if (is_draw(cells)) return 0; // Draw

    const available_cells = [...cells].filter(cell => 
        !cell.classList.contains(CROSS_CLASS) && !cell.classList.contains(CIRCLE_CLASS)
    );

    if (isMaximizing) {
        let bestScore = -Infinity;

        for (let cell of available_cells) {
            cell.classList.add(CIRCLE_CLASS);
            let score = minimax(cells, depth + 1, false);
            cell.classList.remove(CIRCLE_CLASS);
            bestScore = Math.max(score, bestScore);
        }

        return bestScore;
    } 
    else {
        let bestScore = Infinity;

        for (let cell of available_cells) {
            cell.classList.add(CROSS_CLASS);
            let score = minimax(cells, depth + 1, true);
            cell.classList.remove(CROSS_CLASS);
            bestScore = Math.min(score, bestScore);
        }
        
        return bestScore;
    }
}



// Get the best AI move using Minimax
export function get_hard_ai_move(cells) {
    let bestMove = null;
    let bestScore = -Infinity;

    const available_cells = [...cells].filter(cell => 
        !cell.classList.contains(CROSS_CLASS) && !cell.classList.contains(CIRCLE_CLASS)
    );

    for (let cell of available_cells) {
        cell.classList.add(CIRCLE_CLASS); // AI tries this move
        let score = minimax(cells, 0, false);
        cell.classList.remove(CIRCLE_CLASS); // Undo move

        if (score > bestScore) {
            bestScore = score;
            bestMove = cell;
        }
    }

    return bestMove;
}



// Place AI Move (hard Mode)
export function place_hard_ai_move(cells) {
    const ai_cell = get_hard_ai_move(cells);

    if (ai_cell) {
        place_the_mark(ai_cell, CIRCLE_CLASS);
        ai_cell.removeEventListener("click", handle_clicks); // Prevent user clicks

        const ai_winning_cells = is_winner(cells, CIRCLE_CLASS);

        if (ai_winning_cells) {
            end_the_game(true, ai_winning_cells);
            return;
        } else if (is_draw(cells)) {
            end_the_game(false);
            return;
        } else {
            swap_turn();
            update_turn_indicator();
        }
    }
    else {
        return;
    }
}
