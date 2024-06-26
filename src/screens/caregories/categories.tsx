import { AntDesign } from "@expo/vector-icons"
import { useState, useEffect } from "react"
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { Swipeable } from "react-native-gesture-handler"
import {
  List,
  Surface,
  Searchbar,
  FAB,
  ActivityIndicator,
} from "react-native-paper"

import DeleteDialog from "../../components/dialogs/deleteDialog"
import { Category } from "../../models/category"
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks"
import {
  addInitialCategories,
  deleteCategory,
  filterCategories,
} from "../../redux/slices/categories"

export function CategoriesScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<Category>()
  const categoriesSlice = useAppSelector((state) => state.categories)
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
      <Swipeable renderRightActions={() => renderLeftActions(category)}>
        <Surface style={styles.surface}>
          <TouchableOpacity
            onPress={() => navigateToCategoryDetail(category)}
            onLongPress={() => showDeleteConfirmation(category)}
            style={styles.touchableRipple}
          >
            <List.Item
              title={category.name}
              left={(props) => <List.Icon {...props} icon="cloud" />}
            />
          </TouchableOpacity>
        </Surface>
      </Swipeable>
    )
  }

  function renderLeftActions(category: Category) {
    return (
      <TouchableOpacity
        onPress={() => showDeleteConfirmation(category)}
        style={{ ...styles.surface, backgroundColor: "red" }}
      >
        <AntDesign
          style={{ padding: 20 }}
          name="delete"
          size={24}
          color="white"
        />
      </TouchableOpacity>
    )
  }

  function showDeleteConfirmation(category: Category) {
    setDeleteConfirmationVisible(true)
    setCategoryToDelete(category)
  }

  function confirmDeleteDream() {
    dispatch(deleteCategory(categoryToDelete))
    setDeleteConfirmationVisible(false)
  }

  return (
    <View style={styles.mainContainer}>
      <Searchbar
        style={styles.searchBar}
        placeholder="Search"
        onChangeText={filterCategoriesByName}
        value={searchQuery}
      />
      {categoriesSlice.loading ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          <FlatList
            data={categoriesSlice.value}
            renderItem={(categoryItem) =>
              getCategoryListItem(categoryItem.item)
            }
            keyExtractor={(item) => item.id}
          />
          <FAB
            icon="plus"
            style={styles.fab}
            onPress={() => navigation.navigate("SaveCategoryScreen")}
            mode="elevated"
            variant="secondary"
          />
          <DeleteDialog
            itemToDelete={categoryToDelete?.name}
            visible={deleteConfirmationVisible}
            confirm={() => confirmDeleteDream()}
            cancel={() => setDeleteConfirmationVisible(false)}
          />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: "center",
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
    marginHorizontal: 10,
    marginVertical: 4,
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
