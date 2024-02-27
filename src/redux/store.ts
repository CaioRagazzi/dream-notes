import { configureStore } from "@reduxjs/toolkit"

import darkModeReducer from "./slices/darkMode"
import dreamsReducer from "./slices/dreams"

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    dreams: dreamsReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
