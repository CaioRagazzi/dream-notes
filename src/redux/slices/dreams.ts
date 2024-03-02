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

export const addDream = createAsyncThunk("dreams/add", async (dream: Dream) => {
  const dreamService = new DreamService()
  try {
    const dreamId = await dreamService.addData(dream)
    dream.id = dreamId
  } catch (error) {
    console.log(error)
  }
  return dream
})

export const updateDream = createAsyncThunk(
  "dreams/update",
  async (dream: Dream) => {
    const dreamService = new DreamService()
    const updated = await dreamService.updateById(dream)
    if (updated) {
      return dream
    } else {
      return null
    }
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addInitialDreams.fulfilled, (state, action) => {
        state.value = action.payload
      })
      .addCase(addDream.fulfilled, (state, action) => {
        state.value.push(action.payload)
      })
      .addCase(updateDream.fulfilled, (state, action) => {
        if (action.payload) {
          state.value.map((dream) => {
            if (dream.id === action.payload.id) {
              dream.description = action.payload.description
              dream.title = action.payload.title
            }
          })
        }
      })
  },
})

// Action creators are generated for each case reducer function
export const {} = dreamsSlice.actions

export default dreamsSlice.reducer
