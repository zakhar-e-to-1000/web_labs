"use strict"


const film_1 = {
    name: "Tuttu",
    duration: 61,
    reviewCount: 100000
}

const create_name = document.getElementById('name');
const create_duration = document.getElementById('duration');
const create_reviews = document.getElementById('reviews');
const addButton = document.getElementById('create-film');
addButton.addEventListener("click", (e) => {
    const film_obj = getInputs();
    if (film_obj == undefined) {
        return;
    }
    clearCreateInputs();
    addFilmElement(film_obj);
})

function getInputs() {
    if (!create_name.validity.valid) {
        return undefined;
    }
    return {
        name: create_name.value,
        duration: create_duration.value || "0",
        reviewCount: create_reviews.value || "0"
    }
}

function clearCreateInputs() {
    create_name.value = '';
    create_duration.value = '';
    create_reviews.value = '';
}

const itemTemplate = ({ name, duration, reviewCount }) => `
    <li>
    <p>${name}</p>
    <p>${duration}</p>
    <p>${reviewCount}</p>
</li>`

export function addFilmElement(film_obj) {
    parent = document.getElementById("film-container");
    console.log(itemTemplate(film_1));
    parent.insertAdjacentHTML("afterbegin", itemTemplate(film_obj));
}