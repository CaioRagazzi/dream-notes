import * as SplashScreen from "expo-splash-screen"
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

SplashScreen.preventAutoHideAsync()

export default function RootApp() {
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
