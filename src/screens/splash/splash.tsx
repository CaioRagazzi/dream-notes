import React, { useEffect } from "react"
import { StyleSheet, Text, View } from "react-native"
import { hideAsync } from "expo-splash-screen"

type Props = {
  onComplete: (status: boolean) => void
}

export default function Splash({ onComplete }: Props) {
  useEffect(() => {
    setTimeout(() => {
      onComplete(true)
    }, 5000)
  }, [])

  return (
    <View style={styles.mainContainer}>
      <Text>Splash</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
  },
})
