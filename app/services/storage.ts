import config from '../../config';
import AsyncStorage from '@react-native-community/async-storage';
import { Library } from '../types';
const { LIBRARY_KEY } = config;


function getLibrary(): Promise<Library> {
  return AsyncStorage.getItem(LIBRARY_KEY)
    .then((res) => {
      const library = JSON.parse(res || '[]');
      return library;
    })
}

function addToLibrary(bookID: number) {
  return getLibrary()
    .then((library) => {
      library.push(bookID);
      AsyncStorage.setItem(
        LIBRARY_KEY, 
        JSON.stringify(library)
      );
    });
}

function removeFromLibrary(bookID: number) {
  return AsyncStorage.getItem(LIBRARY_KEY)
    .then((res) => {
      let library = JSON.parse(res || '[]');
      library = library.filter((id: number) => id !== bookID);
      AsyncStorage.setItem(
        LIBRARY_KEY, 
        JSON.stringify(library)
      );
    });
}

export default {
  getLibrary,
  addToLibrary,
  removeFromLibrary,
}