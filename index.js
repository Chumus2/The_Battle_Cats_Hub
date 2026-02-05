const Dropdown_Button = document.querySelector(".Dropdown_Button");
const Dropdown_Menu = document.querySelector(".Dropdown_Menu");

const Languages_Button = document.querySelector(".Languages_Button")
const Languages_Menu = document.querySelector(".Languages_Menu")


Dropdown_Button.addEventListener("click", () => {
    Dropdown_Menu.classList.toggle("Active");
    Dropdown_Button.classList.toggle("Active");
});

Languages_Button.addEventListener("click", () => {
    Languages_Menu.classList.toggle("Active");
    Languages_Button.classList.toggle("Active");
});