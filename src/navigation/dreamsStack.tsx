import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"

import CustomNavigationBar from "./customNavigationBar"
import { DreamsScreen } from "../screens/dreams/dreams"
import { SaveDreamScreen } from "../screens/dreams/saveDream"

export default function DreamsStack() {
  const Stack = createNativeStackNavigator()
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
          title: "Save Dream",
          header: (props) => <CustomNavigationBar {...props} />,
        }}
        name="SaveDream"
        component={SaveDreamScreen}
      />
    </Stack.Navigator>
  )
}
