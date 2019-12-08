import { Book, BooksByAuthor, Hit, HitsByAuthor, HitsStructured, HitsSorted } from "../types";

interface Paragraph {
  indices: any[]
}

export function getFirstInstanceParagraphIndex(paragraphs: Paragraph[]) {
  return paragraphs.reduce((pre, cur, i) => {
    return (cur.indices.length > 0 && pre === 0) ? i : pre;
  }, 0);
}

export function sortByName(a: string, b: string) {
  const aNames = a.split(' ');
  const aLastName = aNames[aNames.length - 1];

  const bNames = b.split(' ');
  const bLastName = bNames[bNames.length - 1];

  if (aLastName < bLastName) return -1;
  if (aLastName > bLastName) return 1;

  return 0;
}

export function groupBooksByAuthor(books: Book[]) {
  return books.reduce(
    (pre: BooksByAuthor, cur) => {
      const { authorID } = cur._source;
      if (pre[authorID]) {
        pre[authorID].books.push(cur);
      } else {
        pre[authorID] = {
          name: cur._source.author,
          books: [cur],
        }
      }
      return pre;
    },
    {}
  )
}

export function groupHitsByAuthor(hits: Hit[]): HitsByAuthor {
  return hits.reduce(
    (pre: HitsByAuthor, cur) => {
      const { authorID } = cur._source;
      if (pre[authorID]) {

        pre[authorID].hits.push(cur);
      } else {
        pre[authorID] = {
          name: cur._source.author,
          hits: [cur],
        }
      }
      return pre;
    },
    {}
  )
}

export function structureHits(hits: Hit[], term: string): HitsStructured {
  return hits.reduce(
    (pre: HitsStructured, cur) => {
      const { authorID, content } = cur._source;
      const indices = getIndices(term.toLowerCase(), content.toLowerCase());
      // not exact matches, return
      if (indices.length === 0) return pre;

      if (pre[authorID]) {
        // author is already entered in the table
        const authorHits = pre[authorID];

        if (authorHits.books[cur._source.bookID]) {
          // book is already entered in the table
          const bookHits = authorHits.books[cur._source.bookID]
          bookHits.chapters[cur._source.chapter] = {
            indices,
            content,
          }
        } else {
          // author is entered but book is not
          authorHits.books[cur._source.bookID] = {
            title: cur._source.title,
            chapters: {
              [cur._source.chapter]: {
                indices,
                content,
              }
            }
          }
        }
      } else {
        // author not entered in the table
        pre[authorID] = {
          name: cur._source.author,
          books: {
            [cur._source.bookID]: {
              title: cur._source.title,
              chapters: {
                [cur._source.chapter]: {
                  indices,
                  content,
                }
              }
            }
          }
        }
      }
      return pre;
    },
    {}
  )
}

export function sortStructuredHits(hits: HitsStructured): HitsSorted {
  const sortedHits: HitsSorted = [];

  const sorted = Object.keys(hits)
    .map((authorId) => hits[authorId])
    .sort((a, b) => sortByName(a.name, b.name))

  for (let i = 0; i < sorted.length; i += 1) {
    const authorResults = sorted[i];

    const sortedBooks = Object.keys(authorResults.books)
      .map((bookId) => authorResults.books[bookId])
      .sort((a, b) => sortByName(a.title, b.title))

    const booksInOrder = []
    for (let j = 0; j < sortedBooks.length; j += 1) {
      const bookResults = sortedBooks[j];
      const book = {
        title: bookResults.title,
        chapters: Object.keys(bookResults.chapters)
          .map((chapterNumber) => ({
            ...bookResults.chapters[chapterNumber],
            number: chapterNumber,
          }))
          .sort((a, b) => Number(a) - Number(b)),
      }
      booksInOrder.push(book);
    }

    sortedHits[i] = {
      name: authorResults.name,
      books: booksInOrder,
    }
  }

  return sortedHits;
}

export function getIndices(substring: string, string: string) {
  const indices = []; 
  let i = -1;
  while((i = string.indexOf(substring, i + 1)) >= 0) {
    indices.push(i);
  }
  return indices;
}