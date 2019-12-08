import config from '../../config';
import { Book } from '../types';
const { BONSAI_URL } = config;

const searchURL = BONSAI_URL + '/books/_search?size=100&q=';

interface Result {
  took: number;
  timed_out: boolean;
  hits: {
    hits: Book[]
  } 
}

function getAllBooks(): Promise<Result> {
  return fetch(`${searchURL}*:*`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
}

export default {
  getAllBooks,
}