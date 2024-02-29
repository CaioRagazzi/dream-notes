import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { Category } from "../../databases/models/category"
import CategoryService from "../../databases/services/categories.service"

export const addInitialCategories = createAsyncThunk(
  "categories/fetchAll",
  async () => {
    const categoryService = new CategoryService()
    const categories = await categoryService.findAll()
    return categories
  },
)

interface CategoriesState {
  value: Category[]
}

const initialState: CategoriesState = {
  value: [],
}

export const dreamsSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    updateDream: (state, action: PayloadAction<Category>) => {
      state.value.map((category) => {
        if (category.id === action.payload.id) {
          category.name = action.payload.name
        }
      })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addInitialCategories.fulfilled, (state, action) => {
      state.value = action.payload
    })
  },
})

export const { updateDream } = dreamsSlice.actions

export default dreamsSlice.reducer
