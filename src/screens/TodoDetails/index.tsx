import React, {useEffect, useId, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {TodoDetailsProps} from '../../navigator';
import {addItem, TodoItem, updateItem} from '../../utils/storage';
import styles from './styles';

const TodoDetails: React.FC<TodoDetailsProps> = ({navigation, route}) => {
  const params = route.params;
  const uniqueId = useId();

  const [todoItem, setTodoItem] = useState(params.text ?? '');

  useEffect(() => {
    navigation.setOptions({
      headerTitle: params.action === 'add' ? 'Add a Todo' : 'Update Todo',
    });
  }, [navigation, params.action]);

  const handleAddItem = async () => {
    try {
      const model: TodoItem = {
        id: uniqueId,
        text: todoItem,
      };
      const isAdded = await addItem(model);
      if (isAdded) {
        navigation.pop();
      }
    } catch (err) {
      Alert.alert('', 'Something went wrong');
      console.log(err);
    }
  };

  const handleEditItem = async () => {
    try {
      if (!params.id) {
        return;
      }
      const isUpdated = await updateItem(params.id, todoItem);
      if (isUpdated) {
        navigation.pop();
      }
    } catch (err) {
      Alert.alert('', 'Something went wrong');
      console.log(err);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TextInput
        placeholder="Enter Todo"
        value={todoItem}
        onChangeText={setTodoItem}
        placeholderTextColor={'gray'}
        inputMode="text"
        autoComplete="off"
        autoCorrect={false}
        autoFocus={true}
        style={styles.input}
      />
      <TouchableOpacity
        onPress={params.action === 'add' ? handleAddItem : handleEditItem}
        disabled={todoItem.length === 0}
        style={styles.actionContainer}>
        <Text style={styles.actionText}>
          {params.action === 'add' ? 'Add Item' : 'Update Item'}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default TodoDetails;
