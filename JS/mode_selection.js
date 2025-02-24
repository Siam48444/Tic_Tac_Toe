import { start_the_game } from "../index.js";
import { reset_scores } from "./scores.js";
import { reset_turn, disable_turn_selection, get_user_turn } from "./turns.js";


// Game mode selection
export let mode = "two players"; // Keeps track of the game mode

export function set_game_mode() {
    document.getElementById("mode_selection").addEventListener("change", e => {
        mode = e.target.value; // Set the game mode 
        
        // Usual settings after changing modes
        reset_scores();
        reset_turn();
    
        // Usual settings for ai mode
        if (mode !== "two players") {
            disable_turn_selection(); // Disable turn selection in AI mode
            start_the_game();
            
            // Start the next round
            document.querySelector(".winning_message").addEventListener("click", () => { 
                reset_turn();
                start_the_game();
            });
            
            // Reset the scores and restart the game
            document.querySelector(".restart_button").addEventListener("click", () => {
                reset_scores(); 
                reset_turn();
                start_the_game(); 
            }); 
        }
        else {
            start_the_game()
            reset_turn();
            reset_scores();
            get_user_turn(); // Re-enable turn selection in Two-Player mode
        }
    });
}