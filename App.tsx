import { hideAsync } from "expo-splash-screen"
import {
  MD3DarkTheme as DarkTheme,
  MD3LightTheme as LitgthTheme,
  PaperProvider,
} from "react-native-paper"
import { Provider } from "react-redux"

// import { Dream } from "./src/databases/schemas/dream";
import RootNavigator from "./src/navigation/rootNavigator"
import { useAppSelector } from "./src/redux/reduxHooks"
import { store } from "./src/redux/store"
import { useEffect } from "react"

export default function RootApp() {
  useEffect(() => {
    hideAsync()
    console.log("oi")
  }, [])

  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

function App() {
  const isDarkMode = useAppSelector((state) => state.darkMode.value)

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
