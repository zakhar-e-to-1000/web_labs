"use strict";
const OPEN_CLASSNAME = "open";
const nav = document.getElementById("header__nav");
const menu = document.getElementById("header__menu");
menu.addEventListener("click", () => {
    nav.classList.toggle(OPEN_CLASSNAME);
});
