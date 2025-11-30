import { createSlice, nanoid } from "@reduxjs/toolkit";

function compareVariations(a, b) {
    return a.directorCut === b.directorCut
}

function getPrice(filmName, isDirector = false) {
    const vowels = ['o', 'i', 'e', 'a', 'u']
    let price = 300;
    for (let i = 0; i < filmName; i++) {
        if (vowels.includes(filmName[i])) {
            price += 200;
        }
    }
    if (isDirector) {
        price *= 2;
    }
    return price;
}

const filmCartSlice = createSlice({
    name: 'filmCart',
    initialState: [],
    reducers: {
        addFilmToCart: (state, action) => {
            const { filmId, variations, filmCount, filmName } = action.payload;
            const { directorCut } = variations;
            const existing = state.find((item) => {
                return filmId === item.filmId &&
                    compareVariations(variations, item.variations)
            })
            if (existing) {
                existing.filmCount = Math.max(0, existing.filmCount + filmCount)
            } else {
                const new_item = {
                    id: nanoid(),
                    filmId,
                    filmName,
                    filmCount: Math.max(0, filmCount),
                    variations,
                    price: getPrice(filmName, directorCut)
                }
                state.push(new_item)
            }
            console.log(JSON.stringify(state))

        },
        deleteFilmFromCart: (state, action) => {
            const { id } = action.payload
            state = state.filter((item) => {
                return item.id != id
            })
        }
    }
})

export const { addFilmToCart, deleteFilmFromCart } = filmCartSlice.actions;
export default filmCartSlice.reducer