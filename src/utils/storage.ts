// Implementation for Async Storage

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '../constants';

export type TodoItem = {
  id: string;
  text: string;
};

// Gets all items from storage
export async function getItems(): Promise<TodoItem[]> {
  const result = await AsyncStorage.getItem(Keys.todos);
  if (result) {
    return await JSON.parse(result);
  } else {
    await AsyncStorage.setItem(Keys.todos, JSON.stringify([]));
    return [];
  }
}

// Adds a single item from storage
export async function addItem(item: TodoItem): Promise<boolean> {
  const items = await getItems();
  items.push(item);
  await AsyncStorage.setItem(Keys.todos, JSON.stringify(items));
  return true;
}

// Gets a single item from storage
export async function deleteItem(id: String): Promise<boolean> {
  const items = await getItems();
  if (items.length > 0) {
    const updatedItems = items.filter((todo: TodoItem) => todo.id !== id);
    await AsyncStorage.setItem(Keys.todos, JSON.stringify(updatedItems));
    return true;
  } else {
    return false;
  }
}

// Updates a single item and stores in storage
export async function updateItem(
  id: String,
  updatedText: String,
): Promise<boolean> {
  const items = await getItems();
  if (items.length > 0) {
    const updated = items.map((todo: TodoItem) => {
      return {
        ...todo,
        text: id === todo.id ? updatedText : todo.text,
      };
    });
    await AsyncStorage.setItem(Keys.todos, JSON.stringify(updated));
    return true;
  }
  return false;
}
