import config from '../../config';
import { Library } from '../types';
const { BONSAI_URL } = config;

/*
https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html#query-string-syntax
*/

const searchURL = BONSAI_URL + '/chapters/_search?q=';

function getChaptersFromLibraryWithText(library: Library, text: string) {
  const filteredLibrary = library
    .filter((bookID) => !isNaN(bookID) && bookID > 0);
  const searchString = 'bookID:(' + filteredLibrary.join(' OR ') + ')'
    + ` AND content:${text}`;

  const encodedURI = encodeURI(`${searchURL}${searchString}`);
  console.log('encodedURI is ', encodedURI);
  return fetch(encodedURI, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
}

export default {
  getChaptersFromLibraryWithText,
}