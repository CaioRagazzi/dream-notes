import { View, StyleSheet } from "react-native";
import { Surface, Text } from "react-native-paper";

export function DreamsScreen({ navigation }) {
  return (
    <View>
      <Text variant="bodyMedium">oi 4</Text>
      <Surface style={styles.surface} elevation={4}>
        <Text>Surface</Text>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    height: 80,
    borderRadius: 20,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
