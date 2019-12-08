import React from 'react';
import { 
  Text, 
  View, 
  ScrollView, 
  Image,
  TouchableOpacity,
} from 'react-native';
import bookService from '../../services/books';
import styles from './styles';
import storage from '../../services/storage';
import { Book, BooksByAuthor } from '../../types';
import * as utils from '../../utils';
import globalStyles from '../../styles/index';

interface Props {}
interface State {
  books: Book[];
  library: Book[];
  libraryByAuthor: BooksByAuthor;
}

export default class Books extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      books: [],
      library: [],
      libraryByAuthor: {}
    }

    this.handlePress = this.handlePress.bind(this);
  }

  componentDidMount() {

    // Load all books
    bookService.getAllBooks()
      .then((res) => {
        const books = res.hits.hits;
        this.setState({
          books,
        });

        // Load user's local library ids
        storage.getLibrary()
          .then((libraryIds) => {
            const library = libraryIds
              .map((id) => {
                for (let i = 0; i < books.length; i += 1) {
                  const book = books[i];
                  if (book._source.bookID === id) {
                    return book;
                  }
                }
              })
              .filter(b => b !== undefined) as Book[];

            const libraryByAuthor = utils.groupBooksByAuthor(library)
            this.setState({
              library,
              libraryByAuthor,
            });
          })

      })

  }

  handlePress(bookID: number) {

    storage.removeFromLibrary(bookID);

    let library = this.state.library
      .filter(b => b._source.bookID !== bookID);

    const libraryByAuthor = utils.groupBooksByAuthor(library)

    this.setState({
      library,
      libraryByAuthor,
    });
  }

  render() {


    const {
      libraryByAuthor,
    } = this.state;

    const byAuthorList = Object.keys(libraryByAuthor)
      .map((authorId) => libraryByAuthor[Number(authorId)])
      .sort((a, b) => utils.sortByName(a.name, b.name))

    return (
      <ScrollView 
        contentContainerStyle={globalStyles.container}
      >
        <Text style={globalStyles.title}>
          Library
        </Text>
        <View>
          {
            byAuthorList.map((results) => (
              <View 
                style={styles.authorSection}
                key={results.name}
              >
                <Text style={styles.authorName}>
                  {results.name}
                </Text>
                <View style={globalStyles.listContainer}>
                  {
                    results.books.map((b) => (
                      <View
                        key={b._source.bookID}
                        style={globalStyles.listItem}
                      >
                        <Text>
                          {b._source.title}
                        </Text>
                        <View style={styles.spacer} />
                        <TouchableOpacity
                          onPress={() => this.handlePress(b._source.bookID)}
                        >
                          <Text style={styles.removeText}>
                            Remove
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ))
                  }
                </View>
              </View>
            ))
          }
        </View>
      </ScrollView>
    )
  }
}