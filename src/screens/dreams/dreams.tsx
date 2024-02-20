import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { List, Surface, Searchbar, TouchableRipple } from "react-native-paper";

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
    <View>
      <Searchbar
        style={{ margin: 12 }}
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      {dreams.map((dream) => (
        <Surface id={dream.id.toString()} style={styles.surface} elevation={4}>
          <TouchableRipple
            onPress={() => navigateToDreamDetail(dream)}
            rippleColor="rgba(0, 0, 0, .32)"
            style={{ width: "100%", height: "100%" }}
          >
            <List.Item
              title={dream.title}
              description={dream.description}
              left={(props) => <List.Icon {...props} icon="folder" />}
            />
          </TouchableRipple>
        </Surface>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  surface: {
    height: 80,
    borderRadius: 20,
    margin: 12,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
});
