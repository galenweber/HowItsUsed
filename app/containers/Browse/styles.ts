import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  listItemIcon: {
    paddingRight: 10,
    paddingLeft: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    flex: 1,
  },
  authorSection: {
    paddingBottom: 20,
  },
  authorName: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '600',
  },
  iconContainer: {
    marginRight: 10,
    display: 'flex',
    justifyContent: 'center',
  },
  checkMarkIcon: {
    height: 15,
    width: 15,
  },
  plusIcon: {
    color: 'gray',
  }
});