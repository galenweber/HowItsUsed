import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'black',
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    alignSelf: 'stretch',
  },

  searchButton: {
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderColor: 'black',
    borderWidth: 1,
  },

  disabledButton: {
    borderColor: 'lightgray',
  },

  buttonText: {
    fontWeight: '700',
  },

  disabledButtonText: {
    color: 'lightgray',
  },

  noLibraryText: {
    color: '#bb0000',
  },

  matchesContainer: {
    flex: 1, 
    display: 'flex', 
    marginTop: 20,
    borderColor: 'black',
    paddingBottom: 90,
  },
  matchContainerScrollView: {
    height: '100%',
  },
  matchContentContainerScrollView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  authorName: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 20,
    fontWeight: '600',
  },

  bookTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '600',
  },
  excerptRow: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  excerptText: {
    fontFamily: 'Courier',
    fontSize: 16,
  },

  openExcerptButton: {
    height: 20,
    width: 20,
    marginLeft: 10,
  },

  openExcerptIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

});