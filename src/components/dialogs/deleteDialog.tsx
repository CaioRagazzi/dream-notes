import * as React from "react"
import { View } from "react-native"
import { Button, Dialog, Portal, Text } from "react-native-paper"

export type DialogProps = {
  visible: boolean
  itemToDelete: string
  confirm: () => void
  cancel: () => void
}

export default function DeleteDialog(props: DialogProps) {
  return (
    <View>
      <Portal>
        <Dialog visible={props.visible} onDismiss={props.cancel}>
          <Dialog.Title>Delete</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Are you sure you want to delete "
              <Text style={{ fontWeight: "bold" }}>{props.itemToDelete}</Text>"
              ?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={props.cancel}>No</Button>
            <Button onPress={props.confirm}>Yes</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  )
}
