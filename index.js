let Translations = {};

const Dropdown_Button = document.querySelector(".Dropdown_Button");
const Dropdown_Menu = document.querySelector(".Dropdown_Menu");

const Languages_Button = document.querySelector(".Languages_Button");
const Languages_Menu = document.querySelector(".Languages_Menu");

const Trailer_Preview = document.querySelector(".Trailer_Preview");
const Trailer_Modal = document.querySelector(".Trailer_Modal");
const Trailer_Iframe = document.querySelector(".Trailer_Iframe");
const Trailer_Close_Button = document.querySelector(".Trailer_Close_Button");
const Trailer_Overlay = document.querySelector(".Trailer_Overlay");


// read json translation file
fetch("./translations.json")
  .then(res => res.json())
  .then(data => {
    Translations = data;

    const saved_Language = localStorage.getItem("language") || "EN";
    Change_Language(saved_Language);
  })
  .catch(err => {
    console.error("Failed to load translations:", err);
});


// function to change language
function Change_Language(language) {

    if (!Translations || !Translations[language]) return;

    document.querySelectorAll("[data-translate]").forEach(element => {

        const key = element.getAttribute("data-translate")
        
        if (Translations[language][key]) {
            element.textContent = Translations[language][key];
        }

    });

    localStorage.setItem("language", language);
    Languages_Menu.classList.remove("Active");

    document.querySelectorAll(".Languages_Options button").forEach(button => {
        button.classList.remove("Selected");
    }); 

    const Active_Button = document.querySelector(`[data-language="${language}"]`);
    if (Active_Button) {
        Active_Button.classList.add("Selected")
    };

};

// dropdowns
Dropdown_Button.addEventListener("click", () => {

    Languages_Menu.classList.remove("Active");
    Languages_Button.classList.remove("Active");

    Dropdown_Menu.classList.toggle("Active");
    Dropdown_Button.classList.toggle("Active");

});

Languages_Button.addEventListener("click", () => {

    Dropdown_Menu.classList.remove("Active");
    Dropdown_Button.classList.remove("Active");

    Languages_Menu.classList.toggle("Active");
    Languages_Button.classList.toggle("Active");
    
});


// languages
document.querySelectorAll(".Languages_Options button").forEach(button => {

    button.addEventListener("click", () => {
        const language = button.dataset.language;
        Change_Language(language)
    });

});

document.querySelectorAll(".Content_Box a").forEach(link => {

    link.addEventListener("click", () => {
        Dropdown_Menu.classList.remove("Active")
        Dropdown_Button.classList.remove("Active");
    });

});


// trailer 
Trailer_Preview.addEventListener("click", () => {

    const id = Trailer_Preview.dataset.videoId;
    Trailer_Iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    Trailer_Modal.classList.add("Active");

});

function Close_Trailer() {
    Trailer_Iframe.src = "";
    Trailer_Modal.classList.remove("Active");
}

Trailer_Close_Button.addEventListener("click", Close_Trailer);
Trailer_Overlay.addEventListener("click", Close_Trailer);


// Lock landscape orientation
function lockOrientation() {

    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('portrait').catch(function(error) {
            console.log('Orientation lock failed: ', error);
        });
    } 

    else if (screen.lockOrientation) {
        screen.lockOrientation('portrait');
    } 
    
    else if (screen.mozLockOrientation) {
        screen.mozLockOrientation('portrait');
    } 
    
    else if (screen.msLockOrientation) {
        screen.msLockOrientation('portrait');
    }

}

window.addEventListener('DOMContentLoaded', lockOrientation);
window.addEventListener('orientationchange', function() {
    setTimeout(lockOrientation, 100);
});


// Loading Screen
window.addEventListener("load", () => {

    const Loader = document.getElementById("Loading_Screen");
    
    setTimeout(() => {

        Loader.classList.add("Hidden");
        setTimeout(() => Loader.remove(), 1000);

    }, 750);

});