import { reset_scores } from "../JS/scores.js";
import { disable_turn_selection, reset_turn } from "../JS/turns.js";
import { start_the_game } from "../index.js";



let ai_enabled = false; // Tracks if AI is enabled


export function initialize_mode_selection() {
    document.getElementById("mode_selection").addEventListener("change", e => {
        let mode = e.target.value;
        ai_enabled = (mode !== "two players");
    
        start_the_game();
        reset_scores();
        reset_turn();

        
        // Usual settings for ai mode
        if (ai_enabled) {
            disable_turn_selection();
            
            // Start the next round
            document.querySelector(".winning_message").addEventListener("click", () => { 
                reset_turn();
                start_the_game();
                disable_turn_selection();
            }); 
    
            // Reset the scores and restart the game
            document.querySelector(".restart_button").addEventListener("click", () => { 
                reset_scores();
                reset_turn();
                start_the_game();
                disable_turn_selection();
            }); 
        }
    });
}
