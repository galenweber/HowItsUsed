import React from 'react';
import { 
  Text, 
  View, 
  ScrollView, 
  Image,
  TouchableOpacity,
} from 'react-native';
import books from '../../services/books';
import styles from './styles';
import storage from '../../services/storage';
import { Book, BooksByAuthor } from '../../types';
import globalStyles from '../../styles';
import * as utils from '../../utils';
const checkMarkIcon = require('../../assets/check_mark_circle/check_circle-24px.png');

interface Props {
  viewBy: 'author' | 'title';
}
interface State {
  library: number[];
  booksByAuthor: BooksByAuthor;
}

export default class BrowseByAuthor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      library: [],
      booksByAuthor: {}
    }
  }

  componentDidMount() {
    // Load all books
    books.getAllBooks()
      .then((res) => {
        const books = res.hits.hits;
        const booksByAuthor = utils.groupBooksByAuthor(books)
        this.setState({
          booksByAuthor,
        });
      })

    // Load user's local library ids
    storage.getLibrary()
      .then((library) => {
        this.setState({
          library,
        });
      })
  }

  handlePress(bookID: number) {
    let updated;
    const { library } = this.state;

    if (library.includes(bookID)) {
      updated = library.filter(id => id !== bookID);
      storage.removeFromLibrary(bookID);
    } else {
      updated = [bookID, ...library];
      storage.addToLibrary(bookID);
    }

    this.setState({
      library: updated,
    });
  }

  render() {
    const { booksByAuthor } = this.state;
    const byAuthorList = Object.keys(booksByAuthor)
      .map((authorId) => booksByAuthor[Number(authorId)])
      .sort((a, b) => utils.sortByName(a.name, b.name))

    return (
      <ScrollView 
        contentContainerStyle={globalStyles.container}
      >
        <Text style={globalStyles.title}>
          Browse by Author
        </Text>
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
                    <TouchableOpacity
                      key={b._source.bookID}
                      onPress={() => this.handlePress(b._source.bookID)}
                    >
                      <View
                        style={globalStyles.listItem}
                      >
                        <Text
                        >
                          {b._source.title}
                        </Text>
                        <View style={styles.spacer} />
                        <View style={styles.iconContainer}>
                          {
                            (this.state.library.indexOf(b._source.bookID) !== -1) ? (
                              <Image
                                source={checkMarkIcon}
                                style={styles.checkMarkIcon}
                              />
                            ) : (
                              <Text style={styles.plusIcon}>
                                +
                              </Text>
                            )
                          }
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))
                }
              </View>
            </View>
          ))
        }
      </ScrollView>
    );
  }
}
