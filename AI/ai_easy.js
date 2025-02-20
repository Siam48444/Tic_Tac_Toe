import { CIRCLE_CLASS, CROSS_CLASS } from "../JS/rules.js";


export function get_ai_move(cells) {
    // Get all available (empty) cells
    const available_cells = [...cells].filter(cell => {
        return ( !cell.classList.contains(CROSS_CLASS) && !cell.classList.contains(CIRCLE_CLASS) );
    });

    // No move if the board is full
    if (available_cells.length === 0) return null;

    // Choose a random available cell
    const random_index = Math.floor(Math.random() * available_cells.length);
    const ai_cell = available_cells[random_index];
}