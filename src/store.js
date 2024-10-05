import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './Slices/userSlice'

export default configureStore({
  reducer: {
    counter: UserSlice,
  },
})