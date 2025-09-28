"use strict"

const grid_parent = document.getElementById("film-grid");


const create = document.getElementById("create");
const edit = document.getElementById("edit");
const view = document.getElementById("view");


const header_create = document.getElementById("header__create")
const create_go_back = document.getElementById("create__go-back");
const edit_go_back = document.getElementById("edit__go-back");

const create__name = document.getElementById("create__name");
const create__duration = document.getElementById("create__duration");
const create__reviews = document.getElementById("create__reviews");



header_create.addEventListener('click', () => {
    view.classList.remove("open");
    edit.classList.remove("open");
    create.classList.add("open");
    clearCreateInputs();
})
create_go_back.addEventListener("click", goBack);
edit_go_back.addEventListener("click", goBack);

export function goBack() {
    create.classList.remove("open");
    edit.classList.remove("open");
    view.classList.add("open");
}

export function clearCreateInputs() {
    create__name.value = '';
    create__duration.value = '';
    create__reviews.value = '';
}

export function getCreateInputs() {
    return {
        name: create__name.value,
        duration: create__duration.valueAsNumber,
        reviews: create__reviews.valueAsNumber
    }
}

export function getFilmObj({ name, duration, reviews }) {
    return {
        id: uuid.v1(),
        name,
        duration,
        reviews
    }
}

function cardTemplate({ id, name, duration, reviews }) {
    return `<div id="${id}" class="card">
        <p class="card__title">${name}</p>
        <p class="card__duration">${duration} minutes</p>
        <p class="card__review">${reviews} reviews</p>
    </div>`
}

export function createCard(film_obj) {
    const template = cardTemplate(film_obj);
    grid_parent.insertAdjacentHTML("afterbegin", template);
}

export function renderList(film_list) {
    grid_parent.innerHTML = ''
    for (let film of film_list) {
        createCard(film)
    }
}