import { useState } from "react"
import { StyleSheet, View } from "react-native"
import { TextInput, Button } from "react-native-paper"

import { Category } from "../../databases/models/category"
import CategoryService from "../../databases/services/categories.service"

export function SaveCategoryScreen() {
  const [name, setName] = useState("")

  async function handleSaveCategory() {
    const service = new CategoryService()
    const category = new Category(name)
    await service.addData(category)
  }

  return (
    <View style={styles.mainContainer}>
      <TextInput
        style={styles.textInput}
        mode="outlined"
        label="Category Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Button mode="outlined" onPress={handleSaveCategory}>
        Add
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
