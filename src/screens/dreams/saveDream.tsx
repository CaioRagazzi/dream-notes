import { Picker } from "@react-native-picker/picker"
import { useRef, useState, useEffect } from "react"
import { StyleSheet, View } from "react-native"
import { TextInput, Button, Surface } from "react-native-paper"

import { Dream } from "../../databases/models/dream"
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks"
import { addInitialCategories } from "../../redux/slices/categories"
import { addDream, updateDream } from "../../redux/slices/dreams"

export function SaveDreamScreen({ route, navigation }) {
  const [dream, setDream] = useState<Dream>(null)
  const [selectedCategory, setSelectedCategory] = useState<number>()
  const [isEditing, setIsEditing] = useState(false)
  const appDispatch = useAppDispatch()
  const categories = useAppSelector((state) => state.categories.value)
  const dispatch = useAppDispatch()

  const pickerRef = useRef(null)

  useEffect(() => {
    if (categories) {
      console.log(dream)

      setSelectedCategory(dream?.categoryId ?? 0)
    }
    console.log(categories)
  }, [categories])

  useEffect(() => {
    dispatch(addInitialCategories())
    if (route.params) {
      setIsEditing(true)
      setSelectedCategory(route.params.categoryId ?? 0)
      setDream(route.params)
    } else {
      navigation.setOptions({
        title: "Add Dream",
      })
    }
  }, [])

  async function handleSaveDream() {
    console.log(dream)

    if (isEditing) {
      appDispatch(updateDream(dream))
    } else {
      appDispatch(addDream(dream))
    }
    navigation.goBack()
  }

  function handleCategoryChange(categoryId: number) {
    if (categoryId === 0) {
      setDream((dream) => ({ ...dream, categoryId: null }))
    }
    setSelectedCategory(categoryId)
    setDream((dream) => ({ ...dream, categoryId }))
  }

  return (
    <View style={styles.mainContainer}>
      <TextInput
        style={styles.textInput}
        mode="outlined"
        label="Title"
        value={dream?.title}
        onChangeText={(title) => setDream((dream) => ({ ...dream, title }))}
      />

      <TextInput
        label="Description"
        value={dream?.description}
        mode="outlined"
        style={styles.textInput}
        multiline
        numberOfLines={8}
        onChangeText={(description) =>
          setDream((dream) => ({ ...dream, description }))
        }
      />
      <Surface style={styles.surface}>
        <Picker
          mode="dropdown"
          ref={pickerRef}
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => handleCategoryChange(itemValue)}
        >
          <Picker.Item label="--Select Category--" value="0" />
          {categories.map((category) => {
            return (
              <Picker.Item
                label={category.name}
                value={category.id}
                key={category.id}
              />
            )
          })}
        </Picker>
      </Surface>
      <Button mode="outlined" onPress={handleSaveDream}>
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
