import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './counterSlice'
import hobbySlice from './hobbySlice'
import userSlice from './userSlice'
// ...

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    hobby: hobbySlice,
    user: userSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch