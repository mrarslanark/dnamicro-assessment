import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    flex: 1,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  itemText: {
    color: 'black',
    fontSize: 16,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});

export default styles;
