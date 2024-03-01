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

export const addCategory = createAsyncThunk(
  "categories/add",
  async (category: Category) => {
    const categoryService = new CategoryService()
    const categoryId = await categoryService.addData(category)
    category.id = categoryId
    return category
  },
)

interface CategoriesState {
  value: Category[]
}

const initialState: CategoriesState = {
  value: [],
}

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    updateCategory: (state, action: PayloadAction<Category>) => {
      state.value.map((category) => {
        if (category.id === action.payload.id) {
          category.name = action.payload.name
        }
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addInitialCategories.fulfilled, (state, action) => {
        state.value = action.payload
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.value.push(action.payload)
      })
  },
})

export const { updateCategory } = categoriesSlice.actions

export default categoriesSlice.reducer
