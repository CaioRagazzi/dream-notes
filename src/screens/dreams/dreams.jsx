import { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  List,
  Surface,
  Searchbar,
  TouchableRipple,
  FAB,
} from "react-native-paper";

export function DreamsScreen({ navigation }) {
  const [dreams, setDreams] = useState([
    { id: 1, title: "Sonho 1", description: "Dream description" },
    { id: 2, title: "Sonho 2", description: "Dream description" },
    { id: 3, title: "Sonho 3", description: "Dream description" },
    { id: 4, title: "Sonho 4", description: "Dream description" },
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  function navigateToDreamDetail(dream) {
    navigation.navigate("DreamDetail");
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
  );
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
});
