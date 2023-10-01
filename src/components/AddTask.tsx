import * as React from 'react';
import {Button, Modal, Text, TextInput, View} from 'react-native';
import {Styles} from '../theme/style';

interface AddTaskProps {
  visible: boolean;
  setModal(visible: boolean): void;
  value: string;
  handleValue(arg: string): void;
  handleAdd(): void;
}

export const AddTask: React.FC<AddTaskProps> = ({
  visible,
  setModal,
  value,
  handleValue,
  handleAdd,
}) => {
  return (
    <Modal visible={visible} transparent>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={Styles.modalContainer}>
          <Text>Add new task</Text>
          <TextInput
            value={value}
            onChangeText={text => handleValue(text)}
            style={Styles.inputContainer}
          />
          <View style={Styles.buttonContainer}>
            <Button title="Add" onPress={handleAdd} />
            <Button title="Cancel" onPress={() => setModal(false)} />
          </View>
        </View>
      </View>
    </Modal>
  );
};
