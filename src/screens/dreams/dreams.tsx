import { useState, useEffect } from "react"
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  Text,
} from "react-native"
import Swipeable from "react-native-gesture-handler/Swipeable"
import {
  List,
  Surface,
  Searchbar,
  FAB,
  ActivityIndicator,
} from "react-native-paper"

import { Dream } from "../../models/dream"
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks"
import { addInitialDreams, filterDreams } from "../../redux/slices/dreams"

export function DreamsScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("")
  const dispatch = useAppDispatch()
  const dreamsSlice = useAppSelector((state) => state.dreams)

  useEffect(() => {
    dispatch(addInitialDreams())
  }, [])

  function navigateToDreamDetail(dream) {
    navigation.navigate("SaveDream", dream)
  }

  function filterDreamsByName(dreamName: string) {
    setSearchQuery(dreamName)
    if (!dreamName) {
      dispatch(addInitialDreams())
      return
    }
    dispatch(filterDreams(dreamName))
  }

  function renderLeftActions(progress, dragAnimatedValue) {
    return (
      <View style={{ ...styles.surface, backgroundColor: "red" }}>
        <Text
          style={{
            color: "white",
            paddingHorizontal: 10,
            fontWeight: "600",
          }}
        >
          Delete
        </Text>
      </View>
    )
  }

  function getDreamListItem(dream: Dream) {
    return (
      <Swipeable renderRightActions={renderLeftActions}>
        <View key={dream.id.toString()}>
          <Surface style={styles.surface}>
            <TouchableOpacity
              onPress={() => navigateToDreamDetail(dream)}
              style={styles.touchableRipple}
            >
              <List.Item
                title={dream.title}
                description={dream.description}
                left={(props) => <List.Icon {...props} icon="cloud" />}
              />
            </TouchableOpacity>
          </Surface>
        </View>
      </Swipeable>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <Searchbar
        style={styles.searchBar}
        placeholder="Search"
        onChangeText={filterDreamsByName}
        value={searchQuery}
      />
      {dreamsSlice.loading ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          <FlatList
            refreshing
            data={dreamsSlice.value}
            renderItem={(dreamItem) => getDreamListItem(dreamItem.item)}
            keyExtractor={(item) => item.id.toString()}
          />
          <FAB
            icon="plus"
            style={styles.fab}
            onPress={() => navigation.navigate("SaveDream")}
            mode="elevated"
            variant="secondary"
          />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
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
  swipedRow: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    paddingLeft: 5,
    backgroundColor: "#818181",
    margin: 20,
    minHeight: 50,
  },
  swipedConfirmationContainer: {
    flex: 1,
  },
  deleteConfirmationText: {
    color: "#fcfcfc",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#b60000",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
  },
  deleteButtonText: {
    color: "#fcfcfc",
    fontWeight: "bold",
    padding: 3,
  },
})
