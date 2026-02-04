const Dropdown_Button = document.querySelector(".Dropdown_Button");
const Dropdown_Menu = document.querySelector(".Dropdown_Menu");

Dropdown_Button.addEventListener("click", () => {
    Dropdown_Menu.classList.toggle("Active");
    Dropdown_Button.classList.toggle("Active");
});