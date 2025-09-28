"use strict"
import { goBack, createCard, getFilmObj, getCreateInputs, clearCreateInputs, renderList } from "./dom-utils.js"
import { openDialog } from "./dialog-setup.js"

const list = []
const template = {
    name: "tururu",
    duration: 61,
    reviews: 60000
}
console.log(template);
// for (let i = 0; i < 10; i++) {
//     const film_obj = getFilmObj(template)
//     createCard(film_obj);
//     console.log(uuid.v1());
// }

const filmList = [];

const header__sort = document.getElementById('header__sort')
const create_button = document.getElementById("create__create");
const header__search = document.getElementById("header__search");

header__sort.addEventListener('click', () => {
    header__sort.classList.toggle('checked');
    updateFilmView();
})

header__search.addEventListener("keyup", (e) => {
    if (e.key !== 'Enter') {
        return;
    }
    updateFilmView()
    console.log("hello")
})

create_button.addEventListener('click', () => {
    const input = getCreateInputs()
    clearCreateInputs();
    if (input.name == "") {
        openDialog();
        return;
    }
    const film_obj = getFilmObj(input)
    filmList.unshift(film_obj)

    updateFilmView();
    console.log(filmList);
    goBack();
})

function updateFilmView() {
    const prefix = header__search.value;
    const sort_cond = header__sort.classList.contains('checked')
    const searchResult = filmList.filter((value) => {
        return value.name.startsWith(prefix)
    })
    if (sort_cond) {
        searchResult.sort((a, b) => (a.duration || Infinity) - (b.duration || Infinity));
    }
    renderList(searchResult);
}