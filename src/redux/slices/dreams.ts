import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { Dream } from "../../databases/models/dream"
import DreamService from "../../databases/services/dream.service"

export const addInitialDreams = createAsyncThunk(
  "dreams/fetchAll",
  async () => {
    const dreamService = new DreamService()
    const dreams = await dreamService.findAll()
    return dreams
  },
)

interface DreamsState {
  value: Dream[]
}

const initialState: DreamsState = {
  value: [],
}

export const dreamsSlice = createSlice({
  name: "dreams",
  initialState,
  reducers: {
    updateDream: (state, action: PayloadAction<Dream>) => {
      state.value.map((dream) => {
        if (dream.id === action.payload.id) {
          dream.title = action.payload.title
          dream.description = action.payload.description
        }
      })
    },
    addDream: (state, action: PayloadAction<Dream>) => {
      state.value.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addInitialDreams.fulfilled, (state, action) => {
      state.value = action.payload
    })
  },
})

// Action creators are generated for each case reducer function
export const { updateDream, addDream } = dreamsSlice.actions

export default dreamsSlice.reducer
