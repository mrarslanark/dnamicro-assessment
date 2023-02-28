import React from 'react';
import {Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import styles from './styles';

const FloatingActionButton: React.FC<TouchableOpacityProps> = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>+</Text>
    </TouchableOpacity>
  );
};

export default FloatingActionButton;
