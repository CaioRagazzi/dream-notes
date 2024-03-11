import { createSlice } from "@reduxjs/toolkit"

import { User } from "../../databases/models/user"

const initialState: User = {
  email: "",
  id: 0,
  name: "",
  password: "",
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
})

export const {} = userSlice.actions

export default userSlice.reducer
