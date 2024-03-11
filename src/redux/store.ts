import { configureStore } from "@reduxjs/toolkit"

import categoriesReducer from "./slices/categories"
import darkModeReducer from "./slices/darkMode"
import dreamsReducer from "./slices/dreams"
import userReducer from "./slices/user"

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    dreams: dreamsReducer,
    categories: categoriesReducer,
    user: userReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
