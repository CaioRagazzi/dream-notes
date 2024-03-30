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
      .order("created_at", { ascending: true })

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
      .ilike("name", `%${categoryName}%`)

    return categoryData.data
  },
)

export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (category: Category) => {
    await supabase.from("categories").delete().eq("id", category.id)

    return category.id
  },
)

interface CategoriesState {
  value: Category[]
  loading: boolean
}

const initialState: CategoriesState = {
  value: [],
  loading: false,
}

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addInitialCategories.fulfilled, (state, action) => {
        state.value = action.payload
        state.loading = false
      })
      .addCase(addInitialCategories.pending, (state) => {
        state.loading = true
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
      .addCase(filterCategories.pending, (state, action) => {
        state.loading = true
      })
      .addCase(filterCategories.fulfilled, (state, action) => {
        state.value = action.payload
        state.loading = false
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.value = state.value.filter(
          (category) => category.id === action.payload,
        )
        state.loading = false
      })
  },
})

export const {} = categoriesSlice.actions

export default categoriesSlice.reducer
