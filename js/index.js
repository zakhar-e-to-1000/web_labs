"use strict"
import {
    goBack, goEdit, goCreate,
    getFilmObj, getCreateInputs, getEditInputs,
    clearCreateInputs, renderList, fillEditInputs
} from "./dom-utils.js"
import { openDialog } from "./dialog-setup.js"

const list = []
const template = {
    name: "tururu",
    duration: 61,
    reviews: 60000
}

const filmList = [];

const header_create = document.getElementById("header__create")
const header__search = document.getElementById("header__search");
const header__sort = document.getElementById('header__sort');
const create_button = document.getElementById("create__create");
const edit_button = document.getElementById("edit__edit");


const create_go_back = document.getElementById("create__go-back");
const edit_go_back = document.getElementById("edit__go-back");
create_go_back.addEventListener("click", goBack);
edit_go_back.addEventListener("click", goBack);


header_create.addEventListener('click', () => {
    goCreate()
    clearCreateInputs();
})

header__sort.addEventListener('click', () => {
    header__sort.classList.toggle('checked');
    updateFilmView();
})

header__search.addEventListener("keyup", (e) => {
    if (e.key !== 'Enter') {
        return;
    }
    updateFilmView()
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
    goBack();
})

edit_button.addEventListener('click', () => {
    const input = getEditInputs();
    filmList.forEach((value, index, arr) => {
        if (value.id == input.id) {
            arr[index] = input;
        }
    });
    updateFilmView();
    goBack();
})

function updateFilmView() {
    const prefix = header__search.value;
    const label = document.getElementById("view__title");
    if (prefix === "") {
        label.innerText = 'Films';
    } else {
        label.innerText = `Search: "${prefix}"`
    }
    const sort_cond = header__sort.classList.contains('checked')
    const searchResult = filmList.filter((value) => {
        return value.name.startsWith(prefix)
    })
    if (sort_cond) {
        searchResult.sort((a, b) => (a.duration || Infinity) - (b.duration || Infinity));
    }
    renderList(searchResult, onEdit, onDelete);
}

function onEdit(card_id) {
    const card = checkFilm(card_id);
    if (card === null) {
        return
    }
    fillEditInputs(card)
    goEdit()
}

function onDelete(card_id) {
    console.log("delete");
    for (let index in filmList) {
        if (filmList[index].id === card_id) {
            filmList.splice(index);
            updateFilmView();
            return;
        }
    }
}

function checkFilm(card_id) {
    for (let film of filmList) {
        if (film.id === card_id) {
            return film;
        }
    }
    return null
}