import { useState, useEffect } from "react"
import { View, StyleSheet } from "react-native"
import {
  List,
  Surface,
  Searchbar,
  TouchableRipple,
  FAB,
} from "react-native-paper"

import { Category } from "../../databases/models/category"
import CategoryService from "../../databases/services/categories.service"

export function CategoriesScreen({ navigation }) {
  const [categories, setCategories] = useState<Category[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    async function getCategories() {
      const categoryService = new CategoryService()
      const categories = await categoryService.findAll()
      setCategories(categories)
    }
    getCategories()
  }, [])

  function navigateToCategoryDetail(category) {
    navigation.navigate("SaveCategoryScreen")
  }

  return (
    <View style={styles.mainContainer}>
      <Searchbar
        style={styles.searchBar}
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      {categories.map((category) => (
        <Surface key={category.id.toString()} style={styles.surface}>
          <TouchableRipple
            onPress={() => navigateToCategoryDetail(category)}
            rippleColor="rgba(0, 0, 0, .32)"
            style={styles.touchableRipple}
          >
            <List.Item
              title={category.name}
              left={(props) => <List.Icon {...props} icon="cloud" />}
            />
          </TouchableRipple>
        </Surface>
      ))}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate("SaveCategoryScreen")}
        mode="elevated"
        variant="secondary"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  searchBar: {
    margin: 12,
  },
  touchableRipple: {
    width: "100%",
    height: "100%",
  },
  surface: {
    height: 80,
    borderRadius: 20,
    margin: 12,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
})
