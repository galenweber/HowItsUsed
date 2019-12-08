import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    display: 'flex',
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    backgroundColor: 'white',
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 20,
    width: 20,
    marginBottom: 10,
  }
});