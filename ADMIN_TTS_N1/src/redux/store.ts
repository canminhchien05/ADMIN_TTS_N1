import { configureStore } from '@reduxjs/toolkit'
import appReducer from './slices/app.slices'

export const store = configureStore({
  reducer: {
    app: appReducer
  }
})

// Kiểu TypeScript cho hooks
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
