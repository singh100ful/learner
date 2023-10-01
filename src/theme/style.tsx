import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  inputContainer: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 18,
  },
});
