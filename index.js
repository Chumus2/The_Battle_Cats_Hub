let Translations = {};

const Scroll_Top_Button = document.getElementById("Scroll_Top_Button");

const Dropdown_Button = document.querySelector(".Dropdown_Button");
const Dropdown_Menu = document.querySelector(".Dropdown_Menu");

const Languages_Button = document.querySelector(".Languages_Button");
const Languages_Menu = document.querySelector(".Languages_Menu");

const Trailer_Preview = document.querySelector(".Trailer_Preview");
const Trailer_Modal = document.querySelector(".Trailer_Modal");
const Trailer_Iframe = document.querySelector(".Trailer_Iframe");
const Trailer_Close_Button = document.querySelector(".Trailer_Close_Button");
const Trailer_Overlay = document.querySelector(".Trailer_Overlay");

const Games = document.querySelector('.Game_Textbox');
const Next_Button = document.querySelector('.Next_Button');
const Back_Button = document.querySelector('.Back_Button');
const Game_Image = Games.querySelector("img");
const Game_Link = Games;
const Game_Title = Games.querySelector("h3");
const Game_Description = Games.querySelector("p");

let Current_Index = 0;
const GamesData = [
    {
        href: "https://battlecats.club/en/series/battlecats/",
        img: "Assets/Images/The_Battle_Cats.png",
        alt: "The Battle Cats Main Menu",
        title: "The Battle Cats",
        desc: "An iconic tower defense experience where you build an army of crazy cats."
    },
    {
        href: "https://battlecats.club/en/series/odorobo/",
        img: "Assets/Images/The_Burgle_Cats.png",
        alt: "The Burgle Cats Main Menu",
        title: "The Burgle Cats",
        desc: "A quirky game where sneaky cats dodge traps and outsmart guards."
    },
    {
        href: "https://battlecats.club/en/series/mightycat/",
        img: "Assets/Images/Let_Go_MightyCat.png",
        alt: "Let's Go MightyCat Main Menu",
        title: "Let's Go MightyCat!",
        desc: "Fast action, unstoppable power, and a cat that never slows down."
    },
    {
        href: "https://battlecats.club/en/series/hopping/",
        img: "Assets/Images/Go_Go_PogoCat.png",
        alt: "Go Go PogoCat Main Menu",
        title: "Go Go PogoCat!",
        desc: "Pogo-jumping cat bounces through stages, dodging obstacles and defeating enemies."
    },
    {
        href: "https://battlecats.club/en/series/futaride/",
        img: "Assets/Images/The_Battle_Cats_Unite.png",
        alt: "The Battle Cats Unite Main Menu",
        title: "The Battle Cats Unite",
        desc: "A console version of the iconic tower defense game with cats, stages, and local co-op."
    }
];


// read json translation file
fetch("./translations.json")
  .then(res => res.json())
  .then(data => {
    Translations = data;

    const saved_Language = localStorage.getItem("language") || "EN";
    Change_Language(saved_Language);
    Show_Game(Current_Index)
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

    Show_Game(Current_Index)

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


// games gallery
function Show_Game(index) {

    const Game = GamesData[index];
    const Current_Language = localStorage.getItem("language") || "EN";

    Game_Link.href = Game.href;
    Game_Image.src = Game.img;
    Game_Image.alt = Game.alt;

    const Game_Key = Game.title.replace(/\s+/g, "_").replace(/[^\w]/g, ""); 
    const Translations_For_Language = Translations[Current_Language] || Translations["EN"];

    Game_Title.textContent = Game.title;
    Game_Description.textContent = Translations_For_Language[`${Game_Key}_Description`] || Game.desc;

}

Next_Button.addEventListener('click', () => {
    Current_Index = (Current_Index + 1) % GamesData.length;
    Show_Game(Current_Index);
});

Back_Button.addEventListener('click', () => {
    Current_Index = (Current_Index - 1 + GamesData.length) % GamesData.length;
    Show_Game(Current_Index);
});


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


// scroll top button
window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {
        Scroll_Top_Button.classList.add("Show")
    } 
    else {
        Scroll_Top_Button.classList.remove("Show")
    };

});

Scroll_Top_Button.addEventListener("click", () => {
    window.scrollTo({top: 0});
});


// facebook widget size
function resizeFBWidget() {

    const FB_Page = document.querySelector('.fb-page');
    if (!FB_Page) return;

    let width = 300, height = 700;

    if (window.innerWidth >= 768 && window.innerWidth <= 1023) {
        width = 500;
        height = 900;
    } 
    else if (window.innerWidth >= 1024) {
        width = 600;
        height = 1000;
    }

    FB_Page.setAttribute('data-width', width);
    FB_Page.setAttribute('data-height', height);

    if (window.FB && FB.XFBML) {
        FB.XFBML.parse(FB_Page.parentNode);
    }

}

window.addEventListener('load', resizeFBWidget);
window.addEventListener('resize', resizeFBWidget);