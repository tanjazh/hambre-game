import { configureStore } from '@reduxjs/toolkit'
import hambreReducer from './hambreSlice'

export const store = configureStore({
    reducer: {
        hambre: hambreReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch