import IconAntDesign from "@expo/vector-icons/AntDesign"
import IconEntypo from "@expo/vector-icons/Entypo"
import IconIonicons from "@expo/vector-icons/Ionicons"
import IconMaterialCommunity from "@expo/vector-icons/MaterialCommunityIcons"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import * as SplashScreen from "expo-splash-screen"
import React, { useEffect } from "react"
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation"

import CategoriesStack from "./categoriesStack"
import DreamsStack from "./dreamsStack"
import { supabase } from "../api/supabase"
import { useAppDispatch, useAppSelector } from "../redux/reduxHooks"
import { signIn } from "../redux/slices/user"
import Login from "../screens/login/login"
import CreateLogin from "../screens/login/createLogin"

export default function RootNavigator() {
  const Tab = createMaterialBottomTabNavigator()
  const Stack = createNativeStackNavigator()
  const dispatch = useAppDispatch()
  const isUserLogged = useAppSelector((store) => store.user.isLogged)

  useEffect(() => {
    async function get() {
      const session = await supabase.auth.getSession()
      if (session.data.session) {
        dispatch(signIn())
      }
      await SplashScreen.hideAsync()
    }
    get()
  }, [])

  return (
    <NavigationContainer>
      {isUserLogged ? (
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
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="createLogin"
            component={CreateLogin}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}
