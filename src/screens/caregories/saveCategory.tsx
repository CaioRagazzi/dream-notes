import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { TextInput, Button } from "react-native-paper"

import { Category } from "../../models/categories"
import { useAppDispatch } from "../../redux/reduxHooks"
import {
  addCategory,
  updateCategory,
  uploadCategories,
} from "../../redux/slices/categories"

export function SaveCategoryScreen({ route, navigation }) {
  const [category, setCategory] = useState<Category>(null)
  const [isEditing, setIsEditing] = useState(false)
  const appDispatch = useAppDispatch()

  useEffect(() => {
    if (route.params) {
      setIsEditing(true)
      setCategory(route.params)
    } else {
      navigation.setOptions({
        title: "Add Category",
      })
    }
  }, [])

  async function handleSaveCategory() {
    if (isEditing) {
      appDispatch(updateCategory(category))
    } else {
      appDispatch(addCategory(category))
      appDispatch(uploadCategories())
    }
    navigation.goBack()
  }

  function handleNameChange(name: string) {
    setCategory(new Category(name))
  }

  return (
    <View style={styles.mainContainer}>
      <TextInput
        style={styles.textInput}
        mode="outlined"
        label="Category Name"
        value={category?.name}
        onChangeText={handleNameChange}
      />
      <Button mode="outlined" onPress={handleSaveCategory}>
        {isEditing ? "Save" : "Add"}
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    gap: 8,
  },
  textInput: {
    marginHorizontal: 12,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  surface: {
    borderRadius: 20,
    justifyContent: "center",
    margin: 12,
  },
})
