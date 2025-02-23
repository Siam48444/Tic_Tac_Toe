import { CIRCLE_CLASS, CROSS_CLASS } from "../JS/rules.js";
import { place_the_mark, swap_turn, update_turn_indicator } from "../JS/turns.js";
import { is_draw, is_winner } from "../JS/rules.js";
import { end_the_game, handle_clicks } from "../index.js";


export function get_medium_ai_move(cells) {
    // Get all available (empty) cells
    const available_cells = [...cells].filter(cell => {
        return !cell.classList.contains(CROSS_CLASS) && !cell.classList.contains(CIRCLE_CLASS);
    });

    // No move if the board is full
    if (available_cells.length === 0) return;


    // Try to win
    for (let cell of available_cells) {
        cell.classList.add(CIRCLE_CLASS); // Temporarily Place AI's Mark (CIRCLE_CLASS)
        
        if (is_winner(cells, CIRCLE_CLASS)) { //Check If AI Wins
            cell.classList.remove(CIRCLE_CLASS);
            return cell; 
        }
        else {
            cell.classList.remove(CIRCLE_CLASS);
        }
    }
    
    // Try to block the opponent
    for (let cell of available_cells) {
        cell.classList.add(CROSS_CLASS); // Temporarily Place opponent's Mark (CROSS_CLASS)
        
        if (is_winner(cells, CROSS_CLASS)) { //Check If opponent Wins
            cell.classList.remove(CROSS_CLASS);
            return cell;
        }
        else {
            cell.classList.remove(CROSS_CLASS);
        }
    }

    // Return a random available cell
    return available_cells[Math.floor(Math.random() * available_cells.length)];
}



export function place_medium_ai_move(cells) {
    // Disable cell clicks until the ai puts its mark
    for (let cell of cells) {
        cell.removeEventListener("click", handle_clicks);
    }

    const ai_cell = get_medium_ai_move(cells);

    setTimeout(() => {
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
        
        // Enable cell clicks after the ai puts the mark
        for (let cell of cells) {
            cell.addEventListener("click", handle_clicks);
        }
        
    }, 300);
}