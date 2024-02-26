import { Picker } from "@react-native-picker/picker"
import { useRef, useState } from "react"
import { StyleSheet, View } from "react-native"
import { TextInput, Button, Surface } from "react-native-paper"

import { Dream } from "../../databases/models/dream"
import DreamService from "../../databases/services/dream.service"

export function SaveDreamScreen() {
  const [text, setText] = useState("")
  const [description, setDescription] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState()

  const pickerRef = useRef(null)

  async function handleSaveDream() {
    const service = new DreamService()
    const dream = new Dream(text, description)
    const response = await service.addData(dream)
    console.log(response)
  }

  return (
    <View style={styles.mainContainer}>
      <TextInput
        style={styles.textInput}
        mode="outlined"
        label="Title"
        value={text}
        onChangeText={(text) => setText(text)}
      />

      <TextInput
        label="Description"
        value={description}
        mode="outlined"
        style={styles.textInput}
        multiline
        numberOfLines={8}
        onChangeText={(description) => setDescription(description)}
      />
      <Surface style={styles.surface}>
        <Picker
          mode="dropdown"
          ref={pickerRef}
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
        >
          <Picker.Item label="--Select Category--" value="0" />
          <Picker.Item label="Family" value="1" />
        </Picker>
      </Surface>
      <Button mode="outlined" onPress={handleSaveDream}>
        oi
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    gap: 8,
  },
  textInput: {
    marginHorizontal: 12,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  surface: {
    borderRadius: 20,
    justifyContent: "center",
    margin: 12,
  },
})
