import { useAssets } from "expo-asset"
import React, { useState } from "react"
import { StyleSheet, View, Image, Pressable } from "react-native"
import { Text, Button, Snackbar, TextInput } from "react-native-paper"

import { supabase } from "../../api/supabase"
import { User } from "../../models/user"
import { useAppDispatch } from "../../redux/reduxHooks"
import { signIn } from "../../redux/slices/user"

export default function Login({ navigation }) {
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
      console.log(error)

      setToastVisible(true)
      setTimeout(() => {
        setToastVisible(false)
      }, 3000)
    } else {
      dispatch(signIn())
    }
    setLoading(false)
  }

  function goToCreateLogin(): void {
    navigation.navigate("createLogin")
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
        autoCapitalize="none"
      />
      <View style={styles.createLoginTextContainer}>
        <Pressable onPress={goToCreateLogin}>
          <Text style={styles.createLoginText}>Create an account</Text>
        </Pressable>
      </View>
      <Button
        mode="outlined"
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
      >
        <Text>Login</Text>
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
  createLoginTextContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  createLoginText: {
    textDecorationLine: "underline",
  },
})
