export type Library = number[];

export interface Book {
  _index: "books",
  _type:"_doc",
  _id: string,
  _score: 1,
  _source: {
    author: string,
    authorID: number,
    title: string,
    bookID: number,
    coverUrl: string 
  }
}

export interface BooksByAuthor {
  // author ID
  [key: number]: {
    name: string;
    books: Book[];
  }
}

export interface HitsByAuthor {
  // author ID
  [key: number]: {
    name: string;
    hits: Hit[];
  }
}

export interface HitsStructured {
  // author ID
  [key: string]: {
    name: string;
    books: {
      // book ID
      [key: string]: {
        title: string;
        chapters: {
          // chapter number
          [key: string]: {
            content: string
            indices: number[];
          }
        }
      }
    }
  }
}

export type HitsSorted = { 
  // author name
  name: string, 
  books: { 
    title: string, 
    chapters: { 
      number: string, 
      content: string, 
      indices: number[]
    }[]
  }[] 
}[]

export interface Hit {
  _id: string;
  _index: "chapters"
  _score: number
  _source: {
    author: string;
    authorID: number;
    chapter: number;
    content: string;
    title: string;
    bookID: number;
    paragraphs: {
      text: string;
      indices: number[]
    }[];
    term: string;
  }
  _type: "_doc"
}