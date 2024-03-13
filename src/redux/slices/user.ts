import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { supabase } from "../../api/supabase"
import { User } from "../../databases/models/user"

export const isUserLoggedIn = createAsyncThunk("user/isLoggedIn", async () => {
  const session = await supabase.auth.getSession()

  return session.data.session
})

type InitialUserState = {
  user: User
  isLogged: boolean
}

const initialState: InitialUserState = {
  user: { email: "", id: 0, name: "", password: "" },
  isLogged: false,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state) => {
      state.isLogged = false
    },
    signIn: (state) => {
      state.isLogged = true
    },
  },
  extraReducers: (builder) => {
    builder.addCase(isUserLoggedIn.fulfilled, (state, action) => {
      state.isLogged = !!action.payload
    })
  },
})

export const { signOut, signIn } = userSlice.actions

export default userSlice.reducer
