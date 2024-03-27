import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import {
  MD3DarkTheme as DarkTheme,
  MD3LightTheme as LitgthTheme,
  PaperProvider,
} from "react-native-paper"
import { Provider } from "react-redux"

import { supabase } from "./src/api/supabase"
import RootNavigator from "./src/navigation/rootNavigator"
import { useAppSelector } from "./src/redux/reduxHooks"
import { store } from "./src/redux/store"

SplashScreen.preventAutoHideAsync()

export default function RootApp() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <App />
      </GestureHandlerRootView>
    </Provider>
  )
}

function App() {
  const isDarkMode = useAppSelector((state) => state.darkMode.value)

  useEffect(() => {
    async function getUser() {
      const user = await supabase.auth.getUser()

      console.log(user.data.user?.id)
    }
    getUser()
  }, [])

  const ligthTheme = {
    ...LitgthTheme,
  }

  const darkTheme = {
    ...DarkTheme,
  }

  return (
    <PaperProvider theme={isDarkMode ? darkTheme : ligthTheme}>
      <RootNavigator />
    </PaperProvider>
  )
}
