import { createSlice } from "@reduxjs/toolkit";

const filmCartSlice = createSlice({
    name: 'filmCart',
    initialState: {},
    reducers: {
        addFilmToCart: (state, action) => {
            const { filmCount, filmId, filmName } = action.payload;
            console.log("Payload:", action.payload)
            let num = filmCount
            const name = filmName
            const prev = state[filmId]
            if (prev != undefined) {
                num += prev.filmCount
            }
            state = {
                ...state,
                [filmId]: {
                    filmName: name,
                    filmCount: num,
                }
            }
            console.log(state)
            return state

        },
        deleteFilmFromCart: (state, action) => {
            const { filmId } = action.payload;
            delete state[filmId]
            return state;
        }
    }
})

export const { addFilmToCart, deleteFilmFromCart } = filmCartSlice.actions;
export default filmCartSlice.reducer