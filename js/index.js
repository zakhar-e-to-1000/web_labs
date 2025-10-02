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

header__sort.addEventListener('change', () => {
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
    if (input.name == "" || input.duration < 0 || input.reviews < 0) {
        openDialog();
        return;
    }
    const film_obj = getFilmObj(input)
    filmList.unshift(film_obj)
    header__search.value = ''
    updateFilmView();
    goBack();
})

edit_button.addEventListener('click', () => {
    const input = getEditInputs();
    if (input.name == "" || input.duration < 0 || input.reviews < 0) {
        openDialog();
        return;
    }
    filmList.forEach((value, index, arr) => {
        if (value.id == input.id) {
            arr[index] = input;
        }
    });
    header__search.value = ''
    updateFilmView();
    goBack();
})


function getSort(value) {
    switch (value) {
        case "0":
            return (a, b) => {
                if (a.name > b.name) {
                    return 1
                } else if (a.name < b.name) {
                    return -1;
                } else {
                    return 0;
                }
            }
        case '1':
            return (a, b) => { return (b.duration) - (a.duration); }
        case '2':
            return (a, b) => { return (b.reviews) - (a.reviews); }
        default:
            return null
    }
}

function updateFilmView() {
    console.log('hello')
    const prefix = header__search.value.trim().toLocaleLowerCase();
    const label = document.getElementById("view__title");
    if (prefix === "") {
        label.innerText = 'Films';
    } else {
        label.innerText = `Search: "${prefix}"`
    }
    const searchResult = filmList.filter((value) => {
        return value.name.startsWith(prefix)
    })
    const sort_func = getSort(header__sort.value);
    if (sort_func != null) {
        searchResult.sort(sort_func);
    }
    renderList(searchResult, onEdit, onDelete);
    const c = document.getElementById("view_count");
    c.innerText = `Count: ${searchResult.length}`
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
            filmList.splice(index, 1);
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