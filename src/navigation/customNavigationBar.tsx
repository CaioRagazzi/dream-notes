import { getHeaderTitle } from "@react-navigation/elements"
import { NativeStackHeaderProps } from "@react-navigation/native-stack"
import React from "react"
import { Appbar } from "react-native-paper"

import { supabase } from "../api/supabase"
import { useAppDispatch } from "../redux/reduxHooks"
import { toggleDarkMode } from "../redux/slices/darkMode"

export default function CustomNavigationBar(props: NativeStackHeaderProps) {
  const title = getHeaderTitle(props.options, props.route.name)
  const dispatch = useAppDispatch()

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  return (
    <Appbar.Header elevated>
      {props.back ? (
        <Appbar.BackAction onPress={props.navigation.goBack} />
      ) : null}
      <Appbar.Content title={title} />
      <Appbar.Action
        icon="theme-light-dark"
        onPress={() => dispatch(toggleDarkMode())}
      />
      <Appbar.Action icon="logout" onPress={() => handleLogout()} />
    </Appbar.Header>
  )
}
