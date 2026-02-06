const Dropdown_Button = document.querySelector(".Dropdown_Button");
const Dropdown_Menu = document.querySelector(".Dropdown_Menu");

const Languages_Button = document.querySelector(".Languages_Button")
const Languages_Menu = document.querySelector(".Languages_Menu")

const Translations = {

    EN: {
        Content: "Content",
        Overview: "Overview",
        Developers: "Developers",
        Languages: "Languages"
    },

    DE: {
        Content: "Inhalt",
        Overview: "Überblick",
        Developers: "Entwickler",
        Languages: "Sprachen"
    },

    FR: {
        Content: "Contenu",
        Overview: "Aperçu",
        Developers: "Développeurs",
        Languages: "Langages"
    },

    ES: {
        Content: "Contenido",
        Overview: "Descripción general",
        Developers: "Desarrolladores",
        Languages: "Idiomas"
    },

    IT: {
        Content: "Contenuto",
        Overview: "Panoramica",
        Developers: "Sviluppatori",
        Languages: "Lingue"
    }

};


function Change_Language(language) {

    document.querySelectorAll("[data-translate]").forEach(element => {
        const key = element.getAttribute("data-translate")
        element.textContent = Translations[language][key];
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


document.querySelectorAll(".Languages_Options button").forEach(button => {

    button.addEventListener("click", () => {
        const language = button.dataset.language;
        Change_Language(language)
    });

});

document.addEventListener("DOMContentLoaded", () => {

    const saved_Language = localStorage.getItem("language") || "EN";
    Change_Language(saved_Language);

});