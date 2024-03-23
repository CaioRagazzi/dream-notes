import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import uuid from "react-native-uuid"

import { supabase } from "../../api/supabase"
import { Category } from "../../models/category"

export const addInitialCategories = createAsyncThunk(
  "categories/fetchAll",
  async () => {
    const userData = await supabase.auth.getUser()
    const categoryData = await supabase
      .from("categories")
      .select()
      .eq("user_id", userData.data.user.id)

    return categoryData.data
  },
)

export const addCategory = createAsyncThunk(
  "categories/add",
  async (category: Category) => {
    const userData = await supabase.auth.getUser()
    category.user_id = userData.data.user.id
    category.id = uuid.v4().toString()

    await supabase.from("categories").insert(category)

    return category
  },
)

export const updateCategory = createAsyncThunk(
  "categories/update",
  async (category: Category) => {
    await supabase.from("categories").update(category).eq("id", category.id)

    return category
  },
)

export const filterCategories = createAsyncThunk(
  "categories/filter",
  async (categoryName: string) => {
    const categoryData = await supabase
      .from("categories")
      .select()
      .eq("name", categoryName)

    return categoryData.data
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
          const category: Category = {
            id: categoryDb.id,
            name: categoryDb.name,
            user_id: categoryDb.user_id,
            created_at: categoryDb.created_at,
          }
          state.value.push(category)
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
          const category: Category = {
            id: categoryDb.id,
            name: categoryDb.name,
            user_id: categoryDb.user_id,
            created_at: categoryDb.created_at,
          }
          action.payload.push(category)
        })
      })
  },
})

export const {} = categoriesSlice.actions

export default categoriesSlice.reducer
