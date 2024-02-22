import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import CustomNavigationBar from "./customNavigationBar";
import { CategoriesScreen } from "../screens/categories";

export default function CategoriesStack() {
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
