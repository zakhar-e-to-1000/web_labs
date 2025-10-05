"use strict"
const dialog = document.getElementById('dialog')
const dialog__close = document.getElementById('dialog__close')

dialog__close.addEventListener('click', closeDialog);

export function closeDialog() {
    dialog.classList.remove("open")
}

export function openDialog() {
    dialog.classList.add("open")
}