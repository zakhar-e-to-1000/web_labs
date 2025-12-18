import { createSlice, nanoid } from "@reduxjs/toolkit";

function compareVariations(a, b) {
    return a.directorCut === b.directorCut
}

function getPrice(filmName, isDirector = false) {
    const vowels = ['o', 'i', 'e', 'a', 'u']
    let price = 100;
    for (let i = 0; i < filmName.length; i++) {
        if (vowels.includes(filmName[i])) {
            price += 200;
        }
    }
    if (isDirector) {
        price *= 2;
    }
    return price;
}

export const loadMyState = () => {
    const token = localStorage.getItem("email")
    if (token == null) {
        return undefined
    }
    const stateSerialized = localStorage.getItem(token)
    if (stateSerialized === null) {
        return undefined
    }
    return JSON.parse(stateSerialized)
}

export const saveState = (state) => {
    const stateSerialized = JSON.stringify(state)
    const token = localStorage.getItem("email")
    if (token != null) {
        localStorage.setItem(token, stateSerialized)
    } else {
        console.log("error")
    }
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
        setFilmQuant: (state, action) => {
            const { filmId, variations, filmCount } = action.payload;
            const existing = state.find((item) => {
                return filmId === item.filmId &&
                    compareVariations(variations, item.variations)
            })
            if (existing) {
                existing.filmCount = filmCount
            }
            console.log(JSON.stringify(state))

        },
        deleteFilmFromCart: (state, action) => {
            const { id } = action.payload
            return state.filter((item) => {
                return item.id !== id
            })
        },
        clearFilmCart: () => {
            return []
        },
        resetFilmCart: () => {
            const res = loadMyState()
            if (res != undefined) {
                return res.filmCart
            } else {
                return []
            }
        }
    }
})

export const { resetFilmCart, addFilmToCart, deleteFilmFromCart, setFilmQuant, clearFilmCart } = filmCartSlice.actions;
export default filmCartSlice.reducer