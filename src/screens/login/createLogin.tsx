import React, { useState } from "react"
import { StyleSheet, View, Keyboard } from "react-native"
import { Text, Button, Snackbar, TextInput } from "react-native-paper"

import { supabase } from "../../api/supabase"
import { User } from "../../models/user"

export default function CreateLogin({ navigation }) {
  const [user, setUser] = useState<User>(undefined)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastColor, setToastColor] = useState("#A52A2A")

  async function handleCreateLogin() {
    setToastColor("#A52A2A")
    Keyboard.dismiss()
    if (!user || !user.email || !user.password) {
      setToastMessage("Please fill all required fields")
      setToastVisible(true)
      return
    }
    if (user.password !== confirmPassword) {
      setToastMessage("Password and Confirmation password must be equal")
      setToastVisible(true)
      return
    }
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: user?.email,
      password: user?.password,
      options: {},
    })
    if (error) {
      setToastColor("#A52A2A")
      setToastMessage(error.message)
      setToastVisible(true)
    } else {
      setToastColor("#98FB98")
      setToastMessage(
        "An email was sent to you, please confirm it before accessing!",
      )
      setToastVisible(true)
      navigation.goBack()
    }
    setLoading(false)
  }

  return (
    <View style={styles.mainContainer}>
      <TextInput
        mode="outlined"
        label="Email*"
        value={user?.email}
        onChangeText={(email) => setUser((user) => ({ ...user, email }))}
      />
      <TextInput
        mode="outlined"
        label="Password*"
        value={user?.password}
        secureTextEntry
        onChangeText={(password) => setUser((user) => ({ ...user, password }))}
        autoCapitalize="none"
      />
      <TextInput
        mode="outlined"
        label="Confirm Password*"
        value={confirmPassword}
        secureTextEntry
        onChangeText={(password) => setConfirmPassword(password)}
        autoCapitalize="none"
      />
      <Button
        mode="outlined"
        onPress={handleCreateLogin}
        loading={loading}
        disabled={loading}
      >
        <Text>Create</Text>
      </Button>

      <Button
        mode="outlined"
        onPress={navigation.goBack}
        loading={loading}
        disabled={loading}
      >
        <Text>Back</Text>
      </Button>
      <Snackbar
        visible={toastVisible}
        style={{ backgroundColor: toastColor }}
        onDismiss={() => setToastVisible(false)}
        action={{
          label: "Close",
          onPress: () => {
            setToastVisible(false)
          },
        }}
      >
        {toastMessage}
      </Snackbar>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: "50%",
    gap: 8,
    justifyContent: "center",
    margin: 16,
  },
})
