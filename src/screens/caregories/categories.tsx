import { useState, useEffect } from "react"
import { View, StyleSheet, FlatList } from "react-native"
import {
  List,
  Surface,
  Searchbar,
  TouchableRipple,
  FAB,
} from "react-native-paper"

import { Category } from "../../databases/models/category"
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks"
import {
  addInitialCategories,
  filterCategories,
} from "../../redux/slices/categories"

export function CategoriesScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("")
  const categories = useAppSelector((state) => state.categories.value)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(addInitialCategories())
  }, [])

  function navigateToCategoryDetail(category) {
    navigation.navigate("SaveCategoryScreen", category)
  }

  function filterCategoriesByName(categoryName: string) {
    setSearchQuery(categoryName)
    if (!categoryName) {
      dispatch(addInitialCategories())
      return
    }
    dispatch(filterCategories(categoryName))
  }

  function getCategoryListItem(category: Category) {
    return (
      <View key={category.id.toString()} style={styles.surfaceContainer}>
        <Surface style={styles.surface}>
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
      </View>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <Searchbar
        style={styles.searchBar}
        placeholder="Search"
        onChangeText={filterCategoriesByName}
        value={searchQuery}
      />
      <FlatList
        data={categories}
        renderItem={(categoryItem) => getCategoryListItem(categoryItem.item)}
        keyExtractor={(item) => item.id.toString()}
      />
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
  surfaceContainer: {
    overflow: "hidden",
  },
  surface: {
    height: 80,
    borderRadius: 20,
    margin: 12,
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
