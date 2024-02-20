import IconAntDesign from "@expo/vector-icons/AntDesign";
import IconEntypo from "@expo/vector-icons/Entypo";
import IconIonicons from "@expo/vector-icons/Ionicons";
import IconMaterialCommunity from "@expo/vector-icons/MaterialCommunityIcons";
import { getHeaderTitle } from "@react-navigation/elements";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet } from "react-native";
import {
  MD3DarkTheme as DarkTheme,
  MD3LightTheme as LitgthTheme,
  PaperProvider,
  Appbar,
} from "react-native-paper";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";

import { CategoriesScreen } from "./src/screens/categories";
import { DreamDetailScreen } from "./src/screens/dreams/dreamDetails";
import { DreamsScreen } from "./src/screens/dreams/dreams";

export default function App() {
  const Tab = createMaterialBottomTabNavigator();
  const [darkMode, setDarkMode] = useState(false);

  const theme = {
    ...LitgthTheme,
  };

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            options={{
              tabBarLabel: "Dreams",
              tabBarIcon: ({ color, size, focused }) =>
                focused ? (
                  <IconIonicons name="cloudy-night-sharp" size={22} />
                ) : (
                  <IconMaterialCommunity name="cloud-outline" size={22} />
                ),
            }}
            name="DreamsBottom"
            component={DreamsStack}
          />
          <Tab.Screen
            options={{
              tabBarLabel: "Dreams Categories",
              tabBarIcon: ({ color, size, focused }) =>
                focused ? (
                  <IconEntypo name="folder" size={22} />
                ) : (
                  <IconAntDesign name="folder1" size={22} />
                ),
            }}
            name="DreamsCategories"
            component={CategoriesStack}
          />
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
      <Stack.Screen
        options={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}
        name="DreamDetail"
        component={DreamDetailScreen}
      />
    </Stack.Navigator>
  );
}

function CustomNavigationBar({ navigation, route, options, back }) {
  const title = getHeaderTitle(options, route.name);
  return (
    <Appbar.Header elevated>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
      <Appbar.Action icon="theme-light-dark" onPress={() => {}} />
    </Appbar.Header>
  );
}

function CategoriesStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}
        name="CategoriesStack"
        component={CategoriesScreen}
      />
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
