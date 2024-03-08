import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

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

export const updateCategory = createAsyncThunk(
  "categories/update",
  async (category: Category) => {
    const categoryService = new CategoryService()
    const updated = await categoryService.updateById(category)
    if (updated) {
      return category
    } else {
      return null
    }
  },
)

export const filterCategories = createAsyncThunk(
  "categories/filter",
  async (categoryName: string) => {
    const categoryService = new CategoryService()
    const categories = await categoryService.findByName(categoryName)
    return categories
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addInitialCategories.fulfilled, (state, action) => {
        state.value = action.payload
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.value.push(action.payload)
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        if (action.payload) {
          state.value.map((category) => {
            if (category.id === action.payload.id) {
              category.name = action.payload.name
            }
          })
        }
      })
      .addCase(filterCategories.fulfilled, (state, action) => {
        state.value = action.payload
      })
  },
})

export const {} = categoriesSlice.actions

export default categoriesSlice.reducer
