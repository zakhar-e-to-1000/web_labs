import { configureStore } from '@reduxjs/toolkit'
import reducer from './filmCartSlice';
const store = configureStore({
    reducer: {
        filmCart: reducer
    }
})

export default store;