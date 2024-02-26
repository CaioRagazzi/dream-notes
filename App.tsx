// import { RealmProvider } from "@realm/react";
import { useEffect } from "react"
import {
  MD3DarkTheme as DarkTheme,
  MD3LightTheme as LitgthTheme,
  PaperProvider,
} from "react-native-paper"
import { Provider } from "react-redux"

// import { Dream } from "./src/databases/schemas/dream";
import DatabaseInit from "./src/databases/databaseInit"
import RootNavigator from "./src/navigation/rootNavigator"
import { useAppSelector } from "./src/redux/reduxHooks"
import { store } from "./src/redux/store"

export default function RootApp() {
  useEffect(() => {
    // const dbInit = new DatabaseInit();
  }, [])

  return (
    <Provider store={store}>
      {/* <RealmProvider schema={[Dream]}>
      </RealmProvider> */}
      <App />
    </Provider>
  )
}

export function App() {
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
