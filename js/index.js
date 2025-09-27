"use strict"
import { createCard } from "./dom-utils.js"
const list = []
const film_1 = {
    name: "tururu",
    duration: 61,
    reviews: 60000
}
console.log(film_1);
for (let i = 0; i < 1; i++) {
    createCard(film_1);
}