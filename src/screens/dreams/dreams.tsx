import { useState, useEffect } from "react"
import { View, StyleSheet } from "react-native"
import {
  List,
  Surface,
  Searchbar,
  TouchableRipple,
  FAB,
} from "react-native-paper"

import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks"
import { addInitialDreams } from "../../redux/slices/dreams"

export function DreamsScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("")
  const dispatch = useAppDispatch()
  const dreams = useAppSelector((state) => state.dreams.value)

  useEffect(() => {
    dispatch(addInitialDreams())
  }, [])

  function navigateToDreamDetail(dream) {
    navigation.navigate("SaveDream", dream)
  }

  return (
    <View style={styles.mainContainer}>
      <Searchbar
        style={styles.searchBar}
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      {dreams.map((dream) => (
        <Surface key={dream.id.toString()} style={styles.surface}>
          <TouchableRipple
            onPress={() => navigateToDreamDetail(dream)}
            rippleColor="rgba(0, 0, 0, .32)"
            style={styles.touchableRipple}
          >
            <List.Item
              title={dream.title}
              description={dream.description}
              left={(props) => <List.Icon {...props} icon="cloud" />}
            />
          </TouchableRipple>
        </Surface>
      ))}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate("SaveDream")}
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
