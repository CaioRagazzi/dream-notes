import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import uuid from "react-native-uuid"

import { supabase } from "../../api/supabase"
import CategoryService from "../../databases/services/categories.service"
import { Category } from "../../models/categories"

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
    category.id = uuid.v4().toString()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    category.userId = user.id
    const categoryDb = category.convert()

    await categoryService.addData(categoryDb)
    return category
  },
)

export const updateCategory = createAsyncThunk(
  "categories/update",
  async (category: Category) => {
    const categoryService = new CategoryService()
    const updated = await categoryService.updateById(category.convert())
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

export const uploadCategories = createAsyncThunk(
  "categories/upload",
  async () => {
    const categoryService = new CategoryService()
    const categoriesToUpload = await categoryService.getCategoriesToUpload()
    const { error } = await supabase
      .from("categories")
      .insert(categoriesToUpload)
    console.log(error)
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
        state.value = []
        action.payload.map((categoryDb) => {
          const category = new Category(categoryDb.name)
          category.userId = categoryDb.user_id
          action.payload.push()
        })
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
        state.value = []
        action.payload.map((categoryDb) => {
          const category = new Category(categoryDb.name)
          category.userId = categoryDb.user_id
          action.payload.push()
        })
      })
  },
})

export const {} = categoriesSlice.actions

export default categoriesSlice.reducer
