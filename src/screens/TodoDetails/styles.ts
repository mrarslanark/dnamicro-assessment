import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: 12,
    paddingHorizontal: 6,
  },
  actionContainer: {
    marginTop: 24,
    width: '100%',
    backgroundColor: 'orange',
    height: 50,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  actionText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#212121',
    letterSpacing: 2,
  },
});

export default styles;
