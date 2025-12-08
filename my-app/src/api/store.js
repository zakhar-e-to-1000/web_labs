import { configureStore } from '@reduxjs/toolkit'
import reducer from './filmCartSlice';
import { loadMyState, saveState } from './filmCartSlice';

const persistedState = loadMyState();

const store = configureStore({
    reducer: {
        filmCart: reducer
    },
    preloadedState: persistedState
})

store.subscribe(() => {
    const state = store.getState()
    console.log(state)
    saveState(state)
})

export default store;