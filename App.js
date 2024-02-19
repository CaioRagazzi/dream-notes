import { getHeaderTitle } from "@react-navigation/elements";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { PaperProvider, Appbar } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { CategoriesScreen } from "./src/screens/categories";
import { DreamDetailScreen } from "./src/screens/dreams/dreamDetails";
import { DreamsScreen } from "./src/screens/dreams/dreams";

export default function App() {
  const Tab = createMaterialBottomTabNavigator();
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size, focused }) =>
                focused ? (
                  <Icon name="home" size={22} color="red" />
                ) : (
                  <Icon name="home" size={22} color={color} />
                ),
            }}
            name="DreamsBottom"
            component={DreamsStack}
          />
          <Tab.Screen name="CategoriesBottom" component={CategoriesStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

function DreamsStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DreamsStack"
        component={DreamsScreen}
        options={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}
      />
      <Stack.Screen name="DreamDetail" component={DreamDetailScreen} />
    </Stack.Navigator>
  );
}

function CustomNavigationBar({ navigation, route, options, back }) {
  const title = getHeaderTitle(options, route.name);
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
}

function CategoriesStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="CategoriesStack" component={CategoriesScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
