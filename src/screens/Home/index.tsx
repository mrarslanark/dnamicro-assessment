import React, {useEffect, useState} from 'react';
import {Alert, Button, FlatList, Text, View} from 'react-native';
import FloatingActionButton from '../../components/FloatingActionButton';
import {HomeProps} from '../../navigator';
import {deleteItem, getItems, TodoItem} from '../../utils/storage';
import styles from './styles';

const Home: React.FC<HomeProps> = ({navigation}) => {
  const [data, setData] = useState<TodoItem[]>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', getTodos);
    return unsubscribe;
  }, [navigation]);

  const getTodos = async () => {
    try {
      const items = await getItems();
      setData(items);
    } catch (err) {
      Alert.alert('', 'Something went wrong');
      console.log(err);
    }
  };

  const handleAddItem = () => {
    navigation.navigate('TodoDetails', {action: 'add'});
  };

  const _renderItem = ({item, index}: {item: TodoItem; index: number}) => {
    const handleEditItem = () => {
      navigation.navigate('TodoDetails', {
        action: 'edit',
        id: item.id,
        text: item.text,
      });
    };

    const deleteFromStorage = async () => {
      try {
        const isDeleted = await deleteItem(item.id);
        if (isDeleted) {
          await getTodos();
        }
      } catch (err) {
        Alert.alert('', 'Something went wrong');
        console.log(err);
      }
    };

    const handleDeleteItem = () => {
      const title = 'Are you Sure?';
      const message =
        "You won'\t be able to retrieve this todo after deleting.";
      Alert.alert(title, message, [
        {
          text: 'Delete',
          style: 'destructive',
          onPress: deleteFromStorage,
        },
        {
          text: 'Cancel',
        },
      ]);
    };

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>
          {index + 1}. {item.text}
        </Text>
        <View>
          <Button title="Edit" onPress={handleEditItem} />
          <Button color={'red'} title="Delete" onPress={handleDeleteItem} />
        </View>
      </View>
    );
  };

  const _separator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={_renderItem}
          keyExtractor={item => String(item.id)}
          ItemSeparatorComponent={_separator}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text>Add a Todo Item</Text>
        </View>
      )}
      <FloatingActionButton onPress={handleAddItem} />
    </View>
  );
};

export default Home;
