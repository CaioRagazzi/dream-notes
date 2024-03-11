import IconAntDesign from "@expo/vector-icons/AntDesign"
import IconEntypo from "@expo/vector-icons/Entypo"
import IconIonicons from "@expo/vector-icons/Ionicons"
import IconMaterialCommunity from "@expo/vector-icons/MaterialCommunityIcons"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React, { useEffect, useState } from "react"
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation"

import CategoriesStack from "./categoriesStack"
import DreamsStack from "./dreamsStack"
import { supabase } from "../api/supabase"
import Login from "../screens/login/login"

export default function RootNavigator() {
  const Tab = createMaterialBottomTabNavigator()
  const Stack = createNativeStackNavigator()
  const [supabaseUser, setSupabaseUser] = useState(undefined)

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      setSupabaseUser(user)
    }
    getUser()
  }, [])

  return (
    <NavigationContainer>
      {supabaseUser ? (
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
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}
