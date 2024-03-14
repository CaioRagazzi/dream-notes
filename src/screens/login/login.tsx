import React, { useState } from "react"
import { StyleSheet, View, Image } from "react-native"
import { Button, Snackbar, TextInput } from "react-native-paper"

import { supabase } from "../../api/supabase"
import { User } from "../../databases/models/user"
import { useAppDispatch } from "../../redux/reduxHooks"
import { signIn } from "../../redux/slices/user"
import { useAssets } from "expo-asset"

export default function Login() {
  const [user, setUser] = useState<User>(undefined)
  const [loading, setLoading] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const dispatch = useAppDispatch()
  const [assets, error] = useAssets([
    require("../../../assets/login_robot_head.png"),
  ])

  async function handleLogin() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: user?.email,
      password: user?.password,
    })

    if (error) {
      setToastVisible(true)
      setTimeout(() => {
        setToastVisible(false)
      }, 3000)
    } else {
      dispatch(signIn())
    }
    setLoading(false)
  }

  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          marginTop: 200,
          justifyContent: "center",
          alignItems: "center",
          height: "70%",
        }}
      >
        {assets ? <Image style={styles.tinyImage} source={assets[0]} /> : null}
      </View>
      <TextInput
        mode="outlined"
        label="Email"
        value={user?.email}
        onChangeText={(email) => setUser((user) => ({ ...user, email }))}
      />
      <TextInput
        mode="outlined"
        label="Password"
        value={user?.password}
        secureTextEntry
        onChangeText={(password) => setUser((user) => ({ ...user, password }))}
      />
      <Button
        mode="outlined"
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
      >
        Login
      </Button>
      <Snackbar
        visible={toastVisible}
        onDismiss={() => {}}
        action={{
          label: "Close",
          onPress: () => {
            setToastVisible(false)
          },
        }}
      >
        Error trying to login!
      </Snackbar>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    height: "50%",
    gap: 8,
    justifyContent: "center",
    margin: 16,
  },
  tinyImage: {
    width: 120,
    height: 120,
  },
})
