import { Picker } from "@react-native-picker/picker"
import { useRef, useState, useEffect } from "react"
import { StyleSheet, View } from "react-native"
import { TextInput, Button, Surface } from "react-native-paper"

import { Dream } from "../../databases/models/dream"
import DreamService from "../../databases/services/dream.service"
import { useDispatch } from "react-redux"
import { updateDream } from "../../redux/slices/dreams"

export function SaveDreamScreen({ route, navigation }) {
  const [dream, setDream] = useState<Dream>(null)
  const [selectedLanguage, setSelectedLanguage] = useState()
  const [isEditing, setIsEditing] = useState(false)
  const dispatch = useDispatch()

  const pickerRef = useRef(null)

  useEffect(() => {
    if (route.params) {
      setIsEditing(true)
      setDream(route.params)
    } else {
      navigation.setOptions({
        title: "Add Dream",
      })
    }
  }, [])

  async function handleSaveDream() {
    const service = new DreamService()
    if (isEditing) {
      service.updateById(dream)
      dispatch(updateDream(dream))
    } else {
      await service.addData(dream)
    }
    navigation.goBack()
  }

  return (
    <View style={styles.mainContainer}>
      <TextInput
        style={styles.textInput}
        mode="outlined"
        label="Title"
        value={dream?.title}
        onChangeText={(title) => setDream((dream) => ({ ...dream, title }))}
      />

      <TextInput
        label="Description"
        value={dream?.description}
        mode="outlined"
        style={styles.textInput}
        multiline
        numberOfLines={8}
        onChangeText={(description) =>
          setDream((dream) => ({ ...dream, description }))
        }
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
        {isEditing ? "Save" : "Add"}
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
