"use strict"

const grid_parent = document.getElementById("film-grid");


const create = document.getElementById("create");
const edit = document.getElementById("edit");
const view = document.getElementById("view");

const header__search = document.getElementById("header__search");


const create__name = document.getElementById("create__name");
const create__duration = document.getElementById("create__duration");
const create__reviews = document.getElementById("create__reviews");


const edit__id = document.getElementById("edit__id");
const edit__name = document.getElementById("edit__name");
const edit__duration = document.getElementById("edit__duration");
const edit__reviews = document.getElementById("edit__reviews");


const sort__pannel = document.getElementById("header__sort-pannel");



export function goCreate() {
    header__search.value = ''
    view.classList.remove("open");
    edit.classList.remove("open");
    create.classList.add("open");
    sort__pannel.classList.remove("open");

}

export function goBack() {
    create.classList.remove("open");
    edit.classList.remove("open");
    view.classList.add("open");
    sort__pannel.classList.add("open");
}

export function goEdit() {
    header__search.value = ''
    create.classList.remove("open");
    view.classList.remove("open");
    sort__pannel.classList.remove("open");
    edit.classList.add('open')
}

export function clearCreateInputs() {
    create__name.value = '';
    create__duration.value = '';
    create__reviews.value = '';
}

function sanityzeNum(num) {
    return (num || 0)
}

export function getCreateInputs() {
    return {
        name: create__name.value,
        duration: sanityzeNum(create__duration.valueAsNumber),
        reviews: sanityzeNum(create__reviews.valueAsNumber)
    }
}

export function getEditInputs() {
    return {
        id: edit__id.value,
        name: edit__name.value,
        duration: sanityzeNum(edit__duration.valueAsNumber),
        reviews: sanityzeNum(edit__reviews.valueAsNumber)
    }
}

export function fillEditInputs(film_obj) {
    edit__id.value = film_obj.id;
    edit__name.value = film_obj.name;
    edit__duration.value = film_obj.duration;
    edit__reviews.value = film_obj.reviews;
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

export function renderCard({ id, name, duration, reviews }, callback_edit, callback_delete) {
    // const template = cardTemplate(film_obj);
    const card = document.createElement("div");
    card.classList.add('card');
    card.id = id;
    const p1 = document.createElement("p");
    p1.classList.add("card__title")
    p1.innerText = name
    card.appendChild(p1)
    const p2 = document.createElement("p");
    p2.classList.add("card__duration")
    p2.innerText = `${duration} minutes`
    card.appendChild(p2)
    const p3 = document.createElement("p");
    p3.innerText = `${reviews} reviews`
    p3.classList.add("card__review")
    card.appendChild(p3)

    const close = document.createElement("button");
    close.classList.add("card__close")
    close.textContent = 'Delete'
    card.appendChild(close);

    grid_parent.appendChild(card)

    close.addEventListener('click', (e) => {
        e.stopPropagation();
        callback_delete(id);
    })
    card.addEventListener('click', () => {
        callback_edit(id);
    })
    // grid_parent.insertAdjacentHTML("afterbegin", template);
}

export function renderList(film_list, callback_edit, callback_delete) {
    grid_parent.innerHTML = ''
    for (let film of film_list) {
        renderCard(film, callback_edit, callback_delete)
    }
}