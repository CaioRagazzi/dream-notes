// import { RealmProvider } from "@realm/react";
import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"
import { useEffect } from "react"
import {
  MD3DarkTheme as DarkTheme,
  MD3LightTheme as LitgthTheme,
  PaperProvider,
} from "react-native-paper"
import { Provider } from "react-redux"

// import { Dream } from "./src/databases/schemas/dream";
import { supabase } from "./src/api/supabase"
import DatabaseInit from "./src/databases/databaseInit"
import RootNavigator from "./src/navigation/rootNavigator"
import { useAppSelector } from "./src/redux/reduxHooks"
import { store } from "./src/redux/store"

const BACKGROUND_FETCH_TASK = "background-fetch"

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = Date.now()
  await supabase
    .from("TestBackGround")
    .upsert({
      test: `Got background fetch call at date: ${new Date(now).toISOString()}`,
    })
    .select()
  return BackgroundFetch.BackgroundFetchResult.NewData
})

async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * 1, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  })
}

async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK)
}

export default function RootApp() {
  useEffect(() => {
    // const dbInit = new DatabaseInit()
    checkStatusAsync()
  }, [])

  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync()
    const isRegistered = await TaskManager.isTaskRegisteredAsync(
      BACKGROUND_FETCH_TASK,
    )
    console.log(status)
    console.log(isRegistered)
    if (isRegistered) {
      await unregisterBackgroundFetchAsync()
    }
    // await registerBackgroundFetchAsync()
  }

  return (
    <Provider store={store}>
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
