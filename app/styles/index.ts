import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 120,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 20,
  },
  listContainer: {
    borderColor: 'rgb(229, 229, 234)',
    borderTopWidth: 1,
  },
  listItem: {
    borderColor: 'rgb(229, 229, 234)',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  linkText: {
    color: 'rgb(0, 122, 255)',
    fontSize: 16,
  }
});