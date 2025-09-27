"use strict"

const grid_parent = document.getElementById("film-grid");

function cardTemplate({ name, duration, reviews }) {
    return `<div class="card">
        <p class="card__title">${name}</p>
        <p class="card__duration">${duration}</p>
        <p class="card__review">${reviews}</p>
    </div>`
}

export function createCard(film_obj) {
    const template = cardTemplate(film_obj);
    grid_parent.insertAdjacentHTML("afterbegin", template);
}