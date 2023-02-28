// Module imports
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';

// Local imports
import Home from '../screens/Home';
import TodoDetails from '../screens/TodoDetails';

type RootStackParamList = {
  Home: {} | undefined;
  TodoDetails: {
    action: 'edit' | 'add';
    id?: string | undefined;
    text?: string | undefined;
  };
};

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type TodoDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'TodoDetails'
>;

const Stack = createNativeStackNavigator<RootStackParamList>();
const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerTitle: 'Todo',
        }}
        name={'Home'}
        component={Home}
      />
      <Stack.Screen name={'TodoDetails'} component={TodoDetails} />
    </Stack.Navigator>
  );
};

export default Navigator;
