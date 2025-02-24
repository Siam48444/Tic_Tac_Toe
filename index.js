import { winning_sound, draw_sound, play_sound, is_muted, toggle_sound, sound_button } from "./Assets/Sounds/sounds.js";
import { reset_scores, update_scores } from "./JS/scores.js";
import { CROSS_CLASS, CIRCLE_CLASS, is_winner, is_draw, highlight_winning_cells } from "./JS/rules.js";
import { disable_turn_selection, get_user_turn, circle_turn, swap_turn, update_turn_indicator, place_the_mark, reset_turn } from "./JS/turns.js";
import { mode, set_game_mode } from "./JS/mode_selection.js";
import { place_easy_ai_move } from "./AI/ai_easy.js";
import { place_medium_ai_move } from "./AI/ai_medium.js";
import { place_hard_ai_move } from "./AI/ai_hard.js";



const cells = document.querySelectorAll(".cell");
const winning_message = document.querySelector(".winning_message");
const winner_text = document.querySelector(".winning_message h1");
const restart_button = document.querySelector(".restart_button");

let game_over = false; // Tracks if the game is over
 
 
 
// Let the user choose to mute or unmute
sound_button.addEventListener("click", toggle_sound);



// Game mode selection
set_game_mode();



// Start the game by user clicks
winning_message.addEventListener("click", start_the_game); // Start the next round
restart_button.addEventListener("click", () => { // Reset the scores and restart the game
    reset_turn();
    reset_scores(); 
    start_the_game(); 

    // Restart button arrow animation
    restart_button.classList.add("restart_clicked");
    setTimeout(() => {
        restart_button.classList.remove("restart_clicked");
    }, 600);
}); 



start_the_game(); 
export function start_the_game() {
    winning_message.classList.remove(CROSS_CLASS, CIRCLE_CLASS, "show_draw"); // Hide winning message
    winning_message.style.pointerEvents = "none"; // Remove pointer events to the message after a delay

    game_over = false; // Reset the game over state

    if (mode !== "two players") disable_turn_selection(); // Ensure turn selection is disabled in AI mode
    else get_user_turn(); // Only allow user to select turn in two-player mode

    update_turn_indicator(); // Indicate the user turn graphically 

    cells.forEach(cell => {        
        cell.classList.remove(CIRCLE_CLASS, CROSS_CLASS, "won_cell"); // Clear cell classes

        cell.addEventListener("click", handle_clicks, { once: true }); // Handle cell clicks
    });
}



export function handle_clicks(e) {
    if (game_over) return; // Ignore if game is over

    // Disable user turn select by removing event listeners
    disable_turn_selection();

    const cell = e.target; // Get clicked cell
    const current_turn = circle_turn ? CIRCLE_CLASS : CROSS_CLASS; // Determine current player's turn
    
    place_the_mark(cell, current_turn);
    
    const winning_cells = is_winner(cells, current_turn); // Check if current move is a winning move

    if (winning_cells) {
        end_the_game(true, winning_cells); // End game if there's a winner
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



    // Place ai moves (if enabled)
    if (mode !== "two players") {
        // Disable cell clicks until the ai puts its mark
        for (let Cell of cells) {
            if ( !Cell.classList.contains(CROSS_CLASS) && !Cell.classList.contains(CIRCLE_CLASS) ) {
                Cell.removeEventListener("click", handle_clicks);
            }
        }
    
        // Place ai moves (if enabled)
        setTimeout(() => {
            if (circle_turn && mode === "easy") place_easy_ai_move(cells);
            else if (circle_turn && mode === "medium") place_medium_ai_move(cells);
            else if (circle_turn && mode === "hard") place_hard_ai_move(cells);
    
            
            // Enable cell clicks after the ai puts the mark
            for (let Cell of cells) {
                if ( !Cell.classList.contains(CROSS_CLASS) && !Cell.classList.contains(CIRCLE_CLASS) ) {
                    Cell.addEventListener("click", handle_clicks, { once: true });
                }
            }
        }, 300);
    }
}



export function end_the_game(win, winning_cells = []) {
    game_over = true; // Set game over to true
    
    if (win) {
        const current_turn = circle_turn ? CIRCLE_CLASS : CROSS_CLASS; // Determine the winner class (cross or circle)
        winning_message.classList.add(current_turn); // Show winning message
        winner_text.innerText = "WINNER!"; 

        highlight_winning_cells(cells, winning_cells); 
        update_scores(circle_turn);

        if (circle_turn && mode !== "two players") {
            play_sound(draw_sound, is_muted); // Play the winning sound
        }
        else {
            play_sound(winning_sound, is_muted);
        }
    }
    else {
        winning_message.classList.add("show_draw"); // Show the draw class if there is no winner
        winner_text.innerText = "DRAW!"; 

        play_sound(draw_sound, is_muted); // Play the draw sound
    }

    // Add pointer events to the message after a delay
    setTimeout(() => { winning_message.style.pointerEvents = "all"; }, 800);
}


