import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button, Snackbar, TextInput } from "react-native-paper"

import { supabase } from "../../api/supabase"
import { User } from "../../databases/models/user"

export default function Login() {
  const [user, setUser] = useState<User>(undefined)
  const [loading, setLoading] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)

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
    }
    setLoading(false)
  }

  return (
    <View style={styles.mainContainer}>
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
    flex: 1,
    gap: 8,
    justifyContent: "center",
    margin: 16,
  },
})
