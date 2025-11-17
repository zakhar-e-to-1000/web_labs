import { createSlice } from "@reduxjs/toolkit";

const filmCartSlice = createSlice({
    name: 'filmCart',
    initialState: {},
    reducers: {
        addFilmToCart: (state, action) => {
            const { filmCount, filmId } = action.payload;
            const num = filmCount + (state[filmId] ?? 0)
            state = {
                ...state,
                [filmId]: num
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