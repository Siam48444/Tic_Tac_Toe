const THEMES = [
    "default_light", "default_dark", "dollar", "serika_dark", "moonlight", 
    "retro", "carbon", "neon_ember", "cafe", "red", "darling", "discord",
    "honey", "leather", "lime", "mexican", "miami", "miami_nights", "modern_ink",
    "menthol", "metaverse", "olive",
]

const theme_button = document.querySelector(".theme_button");
const theme_text = theme_button.querySelector("p");

const theme_container = document.querySelector(".theme_container");
const theme_cancel_svg = document.querySelector(".theme_top_head > svg");
const theme_option = document.querySelectorAll(".theme_option");



// Check for the stored theme in the local storage
const stored_theme_name = localStorage.getItem("theme_name"); 
const saved_theme_class = localStorage.getItem("theme_class"); 

if (saved_theme_class) { 
    document.body.classList.add(saved_theme_class); // Update the theme class 
    
    // Update the theme active style based on the last theme
    theme_option.forEach(option => { 
        if (option.getAttribute("data-theme") === saved_theme_class) {
            option.classList.add("active_theme_option");
        } 
        else {
            option.classList.remove("active_theme_option");
        }
    });
} 
else { document.body.classList.add("default_light"); }

// Update the theme name 
if (stored_theme_name) { 
    theme_text.innerText = stored_theme_name; 
}
else {
    theme_text.innerText = "Default Ligth";
}



// Show theme dropdown on click
theme_button.addEventListener("click", () => {
    theme_container.classList.add("theme_open");
});

// Close theme dropdown on click
document.addEventListener("click", e => {
    if ( e.target === theme_container || theme_cancel_svg.contains(e.target) ) {
        theme_container.classList.remove("theme_open");
    }
});



// Make the theme options interactive
theme_option.forEach(option => {
    option.addEventListener("click", () => {
        theme_container.classList.remove("theme_open"); // Close the theme dropdown 
        
        remove_all_body_classes(THEMES); 
        
        update_theme(option); 
        update_theme_name(option); 
        update_theme_active_style(option);

        save_the_theme(option); 
    });
});



function remove_all_body_classes(themes_list) { // Remove all the classes from the body
    for (let theme of themes_list) {
        document.body.classList.remove(theme);
    }
}



function update_theme(theme_option) { // Add the theme class to the body
    var theme_class = theme_option.getAttribute("data-theme");
    document.body.classList.add(theme_class);
}



function update_theme_name(theme_option) { // Update appearance button text
    var theme_name = theme_option.getAttribute("data-theme-name");
    theme_text.innerText = theme_name;
}



function update_theme_active_style(option) { // Update the active style of the theme option
    theme_option.forEach(opt => { opt.classList.remove("active_theme_option"); });
    option.classList.add("active_theme_option");
}



function save_the_theme(theme_option) { // Save the theme class and theme name in the local storage
    var theme_class = theme_option.getAttribute("data-theme");
    var theme_name = theme_option.getAttribute("data-theme-name");

    localStorage.setItem("theme_class", theme_class);
    localStorage.setItem("theme_name", theme_name);
}