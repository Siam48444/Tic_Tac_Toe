import { CIRCLE_CLASS, CROSS_CLASS } from "../JS/rules.js";
import { place_the_mark, swap_turn, update_turn_indicator } from "../JS/turns.js";
import { is_draw, is_winner } from "../JS/rules.js";
import { end_the_game, handle_clicks } from "../index.js";



export function get_medium_ai_move(cells) {
    // Get all available (empty) cells
    const available_cells = [...cells].filter(cell => 
        !cell.classList.contains(CROSS_CLASS) && !cell.classList.contains(CIRCLE_CLASS)
    );

    // No move if the board is full
    if (available_cells.length === 0) return null;

    // Try to find a winning move
    for (let cell of available_cells) {
        cell.classList.add(CIRCLE_CLASS);
        if (is_winner(cells, CIRCLE_CLASS)) {
            cell.classList.remove(CIRCLE_CLASS);
            return cell;
        }
        cell.classList.remove(CIRCLE_CLASS);
    }

    // Try to block the opponent's winning move
    for (let cell of available_cells) {
        cell.classList.add(CROSS_CLASS);
        if (is_winner(cells, CROSS_CLASS)) {
            cell.classList.remove(CROSS_CLASS);
            return cell;
        }
        cell.classList.remove(CROSS_CLASS);
    }

    // Otherwise, pick a random move
    const random_index = Math.floor(Math.random() * available_cells.length);
    return available_cells[random_index];
}

export function place_medium_ai_move(cells) {
    setTimeout(() => {
        const ai_cell = get_medium_ai_move(cells);
        if (!ai_cell) return;
        
        ai_cell.removeEventListener("click", handle_clicks); // Prevent user clicks
        place_the_mark(ai_cell, CIRCLE_CLASS);

        const ai_winning_cells = is_winner(cells, CIRCLE_CLASS);
        if (ai_winning_cells) {
            end_the_game(true, ai_winning_cells);
            return;
        }
        
        if (is_draw(cells)) {
            end_the_game(false);
            return;
        }
        
        swap_turn();
        update_turn_indicator();
    }, 100);
}
