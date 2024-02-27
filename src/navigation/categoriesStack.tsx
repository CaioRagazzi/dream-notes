import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"

import CustomNavigationBar from "./customNavigationBar"
import { CategoriesScreen } from "../screens/caregories/categories"
import { SaveCategoryScreen } from "../screens/caregories/saveCategory"

export default function CategoriesStack() {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: "Categories",
          header: (props) => <CustomNavigationBar {...props} />,
        }}
        name="CategoriesScreen"
        component={CategoriesScreen}
      />
      <Stack.Screen
        options={{
          title: "Save Category",
          header: (props) => <CustomNavigationBar {...props} />,
        }}
        name="SaveCategoryScreen"
        component={SaveCategoryScreen}
      />
    </Stack.Navigator>
  )
}
