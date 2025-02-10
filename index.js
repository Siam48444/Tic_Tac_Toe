const cells = document.querySelectorAll(".cell");

const winning_message = document.querySelector(".winning_message");
const winner_text = document.querySelector(".winning_message h1");
const restart_button = document.querySelector(".restart_button");

const score_button_X = document.querySelector(".score_button_X");
const score_button_O = document.querySelector(".score_button_O");

const score_X = document.querySelector(".score_X");
const score_O = document.querySelector(".score_O");

const CROSS_CLASS = "cross"; // Class for X mark
const CIRCLE_CLASS = "circle"; // Class for O mark
const ACTIVE_TURN = "active_turn"; // Class for active turn

var circle_turn; // Tracks if it's O's turn
var game_over; // Tracks if the game is over

var Xscore = 0; // Tracks the score of X
var Oscore = 0; // Tracks the score of O

// All possible winning combinations
const WINNING_COMBINATIONS = [ 
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontals
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticals
    [0, 4, 8], [2, 4, 6] // Diagonals
];


// Start the game by user clicks
winning_message.addEventListener("click", start_the_game); // Start the next round
restart_button.addEventListener("click", () => { // Reset the scores and restart the game
    reset_scores(); 
    start_the_game(); 
}); 


start_the_game(); 
function start_the_game() {
    winning_message.classList.remove(CROSS_CLASS, CIRCLE_CLASS, "show_draw"); // Hide winning message
    winning_message.style.pointerEvents = "none"; // Remove pointer events to the message after a delay

    game_over = false; // Reset game over state
    circle_turn = false; // Start the game with cross

    get_user_turn(); // Let the user choose the first mark
    update_turn_indicator(); // Indicate the user turn graphically 

    cells.forEach(cell => {        
        cell.classList.remove(CIRCLE_CLASS, CROSS_CLASS, "won_cell"); // Clear cell classes
        cell.addEventListener("click", handle_clicks, { once: true }); // Handle cell clicks
    });
}


function reset_scores() {
    // Reset the scores after restarting the game
    Xscore = 0;
    Oscore = 0;
    score_X.innerText = "-";
    score_O.innerText = "-";
}


function get_user_turn() {
    // Get the first turn by the user click
    score_button_X.addEventListener("click", choose_X);
    score_button_O.addEventListener("click", choose_O);
}
function choose_X() { circle_turn = false; update_turn_indicator(); }
function choose_O() { circle_turn = true; update_turn_indicator(); }


function update_turn_indicator() {
    // Indicate the user turn graphically
    circle_turn ? score_button_O.classList.add(ACTIVE_TURN) : score_button_O.classList.remove(ACTIVE_TURN);
    !circle_turn ? score_button_X.classList.add(ACTIVE_TURN) : score_button_X.classList.remove(ACTIVE_TURN);
}


function handle_clicks(e) {
    if (game_over) return; // Ignore if game is over

    // Disable user turn select by removing event listeners
    score_button_X.removeEventListener("click", choose_X);
    score_button_O.removeEventListener("click", choose_O);

    const cell = e.target; // Get clicked cell
    const current_turn = circle_turn ? CIRCLE_CLASS : CROSS_CLASS; // Determine current player's turn

    place_the_mark(cell, current_turn); 
    
    const winning_cells = is_winner(current_turn); // Check if current move is a winning move
    if (winning_cells) {
        end_the_game(true, winning_cells); // End game if there's a winner
    }
    else if (is_draw()) {
        end_the_game(false); // End game if it's a draw
    }
    else {
        swap_turn(); 
        update_turn_indicator();
    }
}


// Add current player's mark (X or O) to the cell
function place_the_mark(cell, current_turn) { cell.classList.add(current_turn); }


// Switch turns between X and O
function swap_turn() { circle_turn = !circle_turn; }


function is_winner(current_turn) {
    // Check if any winning combination is met and return it
    return WINNING_COMBINATIONS.find(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(current_turn);
        });
    });
}


function update_scores(circle_turn) {
    // Update the score after each round
    if (circle_turn) {
        Oscore ++;
        score_O.innerText = Oscore;
    }
    else {
        Xscore ++;
        score_X.innerText = Xscore;
    }
}


function highlight_winning_cells(winning_cells) {
    // Highlight cells that form the winning combination
    winning_cells.forEach(index => {
        cells[index].classList.add("won_cell");
    });
}


function is_draw() {
    // Check if all cells are filled without a winner
    return Array.from(cells).every(cell => {
        return cell.classList.contains(CROSS_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });
}


function end_the_game(win, winning_cells = []) {
    game_over = true; // Set game over to true
    
    if (win) {
        const winner_class = circle_turn ? CIRCLE_CLASS : CROSS_CLASS; // Determine the winner class (cross or circle)
        winning_message.classList.add(winner_class); // Show winning message
        
        winner_text.innerText = "WINNER!"; 

        highlight_winning_cells(winning_cells); 
        update_scores(circle_turn);
    }
    else {
        winning_message.classList.add("show_draw"); // Show the draw class if there is no winner
        winner_text.innerText = "DRAW!"; 
    }

    // Add pointer events to the message after a delay
    setTimeout(() => { winning_message.style.pointerEvents = "all"; }, 800);
}