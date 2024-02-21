import IconAntDesign from "@expo/vector-icons/AntDesign";
import IconEntypo from "@expo/vector-icons/Entypo";
import IconIonicons from "@expo/vector-icons/Ionicons";
import IconMaterialCommunity from "@expo/vector-icons/MaterialCommunityIcons";
import { getHeaderTitle } from "@react-navigation/elements";
import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackHeaderProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import {
  MD3DarkTheme as DarkTheme,
  MD3LightTheme as LitgthTheme,
  PaperProvider,
  Appbar,
} from "react-native-paper";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { Provider } from "react-redux";

import { useAppDispatch, useAppSelector } from "./src/redux/reduxHooks";
import { toggleDarkMode } from "./src/redux/slices/darkMode";
import { store } from "./src/redux/store";
import { CategoriesScreen } from "./src/screens/categories";
import { DreamDetailScreen } from "./src/screens/dreams/dreamDetails";
import { DreamsScreen } from "./src/screens/dreams/dreams";

export default function RootApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export function App() {
  const Tab = createMaterialBottomTabNavigator();
  const isDarkMode = useAppSelector((state) => state.darkMode.value);

  const ligthTheme = {
    ...LitgthTheme,
  };

  const darkTheme = {
    ...DarkTheme,
  };

  return (
    <PaperProvider theme={isDarkMode ? darkTheme : ligthTheme}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            options={{
              tabBarLabel: "Dreams",
              tabBarIcon: ({ color, focused }) =>
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
              tabBarIcon: ({ color, focused }) =>
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
        name="Dreams"
        component={DreamsScreen}
        options={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}
      />
      <Stack.Screen
        options={{
          title: "Dream",
          header: (props) => <CustomNavigationBar {...props} />,
        }}
        name="DreamDetail"
        component={DreamDetailScreen}
      />
    </Stack.Navigator>
  );
}

function CustomNavigationBar(props: NativeStackHeaderProps) {
  const title = getHeaderTitle(props.options, props.route.name);
  const dispatch = useAppDispatch();

  return (
    <Appbar.Header elevated>
      {props.back ? (
        <Appbar.BackAction onPress={props.navigation.goBack} />
      ) : null}
      <Appbar.Content title={title} />
      <Appbar.Action
        icon="theme-light-dark"
        onPress={() => dispatch(toggleDarkMode())}
      />
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
