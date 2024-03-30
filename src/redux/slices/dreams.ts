import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import uuid from "react-native-uuid"

import { supabase } from "../../api/supabase"
import { Dream } from "../../models/dream"

export const addInitialDreams = createAsyncThunk(
  "dreams/fetchAll",
  async () => {
    const userData = await supabase.auth.getUser()
    const dreamsData = await supabase
      .from("dreams")
      .select()
      .eq("user_id", userData.data.user.id)
      .order("created_at", { ascending: true })

    return dreamsData.data
  },
)

export const addDream = createAsyncThunk("dreams/add", async (dream: Dream) => {
  const userData = await supabase.auth.getUser()
  dream.user_id = userData.data.user.id
  dream.id = uuid.v4().toString()

  await supabase.from("dreams").insert(dream)

  return dream
})

export const updateDream = createAsyncThunk(
  "dreams/update",
  async (dream: Dream) => {
    await supabase.from("dreams").update(dream).eq("id", dream.id)

    return dream
  },
)

export const filterDreams = createAsyncThunk(
  "dreams/filter",
  async (dreamName: string) => {
    const dreamData = await supabase
      .from("dreams")
      .select()
      .ilike("title", `%${dreamName}%`)

    return dreamData.data
  },
)

export const deleteDream = createAsyncThunk(
  "dreams/delete",
  async (dream: Dream) => {
    await supabase.from("dreams").delete().eq("id", dream.id)

    return dream.id
  },
)

interface DreamsState {
  value: Dream[]
  loading: boolean
}

const initialState: DreamsState = {
  value: [],
  loading: false,
}

export const dreamsSlice = createSlice({
  name: "dreams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addInitialDreams.fulfilled, (state, action) => {
        state.value = action.payload
        state.loading = false
      })
      .addCase(addInitialDreams.pending, (state) => {
        state.loading = true
      })
      .addCase(addDream.fulfilled, (state, action) => {
        state.value.push(action.payload)
        state.loading = false
      })
      .addCase(addDream.pending, (state) => {
        state.loading = true
      })
      .addCase(updateDream.fulfilled, (state, action) => {
        if (action.payload) {
          state.value.map((dream) => {
            if (dream.id === action.payload.id) {
              dream.description = action.payload.description
              dream.title = action.payload.title
              dream.category_id = action.payload.category_id
            }
          })
        }
        state.loading = false
      })
      .addCase(updateDream.pending, (state) => {
        state.loading = true
      })
      .addCase(filterDreams.fulfilled, (state, action) => {
        state.value = action.payload
        state.loading = false
      })
      .addCase(deleteDream.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteDream.fulfilled, (state, action) => {
        state.value = state.value.filter((dream) => dream.id === action.payload)
        state.loading = false
      })
  },
})

// Action creators are generated for each case reducer function
export const {} = dreamsSlice.actions

export default dreamsSlice.reducer
