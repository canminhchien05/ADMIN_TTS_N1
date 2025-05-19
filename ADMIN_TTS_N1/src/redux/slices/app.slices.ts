import { createSlice } from '@reduxjs/toolkit'

interface AppState {
  isOpenDrawer: boolean
}

const initialState: AppState = {
  isOpenDrawer: false
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setStateDrawer: (state) => {
      state.isOpenDrawer = !state.isOpenDrawer
    }
  }
})

export const { setStateDrawer } = appSlice.actions
export default appSlice.reducer
