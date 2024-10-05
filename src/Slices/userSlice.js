import { createSlice } from '@reduxjs/toolkit'

export const UserSlice = createSlice({
  name: 'counter',
  initialState: {
    userData: JSON.parse(localStorage.getItem('userData')) ?  JSON.parse(localStorage.getItem('userData')) : null,
  },
  reducers: {
    mainData: (state, action) => {
      state.userData = action.payload
    },
  },
})

export const {mainData } = UserSlice.actions

export default UserSlice.reducer