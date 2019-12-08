import React from 'react';
import { 
  TextInput, 
  Text, 
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  View,
  Image,
} from 'react-native';
import styles from './styles';
import chapters from '../../services/chapters';
import storage from '../../services/storage';
import globalStyles from '../../styles';
import { Hit, HitsStructured, HitsSorted } from '../../types';
import * as utils from '../../utils';
import * as assets from './assets';
import { Navigate } from '../../../App';
import * as cacheService from '../../services/cache';

interface State {
  searchTerm: string;
  loading: boolean;
  noResults: boolean;
  library: number[];
  hitsStructured: HitsStructured;
  hitsSorted: HitsSorted;
  scrollViewWidth?: number;
}

interface Props {
  navigate: Navigate;
}

export default class Search extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'How It\'s Used',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      searchTerm: '',
      // matches: [],
      loading: true,
      noResults: false,
      library: [],
      hitsStructured: {},
      hitsSorted: [],
    }

    this.structureContent = this.structureContent.bind(this);
    this.addMetaData = this.addMetaData.bind(this);
    this.search = this.search.bind(this);
    // this.handleExcerptPress = this.handleExcerptPress.bind(this);
  }

  search() {
    const { searchTerm } = this.state;
    this.setState({ loading: true });
    return storage.getLibrary()
      .then((library) => {
        return chapters.getChaptersFromLibraryWithText(library, searchTerm)
          .then((json) => {
            const hitsStructured = utils.structureHits(json.hits.hits, searchTerm) 
            const hitsSorted = utils.sortStructuredHits(hitsStructured);
            this.setState({
              hitsStructured,
              hitsSorted, 
              loading: false,
              noResults: (json.hits.hits.length === 0),
            });
            cacheService.setCache({ hitsSorted, hitsStructured, searchTerm })
          })
      })
      .catch((err) => {
        console.log('err is ', err);
      })
  }

  /*
    _id:"68-1342-3"
    _index:"chapters"
    _score:1.744512
    _source: {content: "Chapter 3↵↵↵No", author: "Jane Austen", authorID: 68, title: "Pride and Prejudice", bookID: 1342, …}
    _type:"_doc"
  */
  structureContent(hit: Hit) {
    const paragraphs = hit._source.content
      .split('\n\n')
      .map(p => ({
        text: p.replace(/[\n\r]/g, ' '),
        indices: this.getIndicesOf(p, this.state.searchTerm),
      }));

    hit._source.paragraphs = paragraphs;
    return hit;
  }

  getIndicesOf(text: string, term: string) {
    let startIndex = 0;
    let normalizedText = text.toLowerCase();
    const normalizedTerm = term.toLowerCase().trim();
    const re = new RegExp('\\b' + normalizedTerm + '\\b', 'g');
    const indices = [];

    let index = normalizedText.search(re);
    while (index > -1 && indices.length < 5) {
      index = index + startIndex;
      indices.push(index);
      startIndex = index + normalizedTerm.length;
      normalizedText = text.slice(startIndex);
      index = normalizedText.search(re);
    }

    return indices;
  }

  addMetaData(hit: Hit) {
    hit._source.term = this.state.searchTerm;
    return hit;
  }

  componentDidMount() {
    const cache = cacheService.getCache();
    if (cache) {
      this.setState(cache);
    }

    storage.getLibrary()
      .then((library) => {
        this.setState({
          library,
          loading: false,
        });
      })
  }

  render() {

    const {
      searchTerm,
      // matches,
      loading,
      noResults,
      hitsSorted,
      library,
    } = this.state;

    const disableButton = loading || library.length === 0;

    return (
        <ScrollView 
          contentContainerStyle={globalStyles.container}
        >
          <Text style={globalStyles.title}>
            Search
          </Text>
          <Text>
            Enter a term to search:
          </Text>
          <TextInput 
            style={styles.input}
            value={searchTerm}
            onChangeText={(searchTerm) => this.setState({ searchTerm })}
          />
          <TouchableOpacity
            onPress={this.search}
            style={{
              ...styles.searchButton,
              ...(disableButton ?
                styles.disabledButton
                : {}
              ),
            }}
            disabled={loading || this.state.library.length === 0}
          > 
            {
              (loading) ? (
                <ActivityIndicator />
              ) : (
                <Text style={{
                  ...styles.buttonText,
                  ...(disableButton ? styles.disabledButtonText : {}),
                }}>
                  SEARCH
                </Text>
              )
            }
          </TouchableOpacity>
          {
            (noResults) && (
              <Text>No results</Text>
            )
          }
          {
            (!loading && this.state.library.length === 0) && (
              <Text style={styles.noLibraryText}>
                You must add books to your library before searching for a word.
              </Text>
            )
          }
          {
            hitsSorted.map(h => (
              <>
                <Text style={styles.authorName}>
                  {h.name}
                </Text>
                {
                  h.books.map(b => (
                    <>
                      <Text style={styles.bookTitle}>
                        {b.title}
                      </Text>
                      {
                        b.chapters.map(c => (
                          <>
                            {
                              c.indices.map(i => {
                                let index = i;
                                let noNewLines = c.content
                                  // remove newlines
                                  .replace(/(\n|\r)/gm, " ")

                                let startIndex = Math.max(0, index - 150);
                                let endIndex = Math.min(noNewLines.length, index + 150);

                                let loopIndex = 0;
                                while ((startIndex > index - 150) && loopIndex < 151) {
                                  noNewLines = " " + noNewLines;
                                  index += 1;
                                  endIndex += 1;
                                  loopIndex += 1;
                                }

                                while ((endIndex < index + 150) && loopIndex < 151) {
                                  noNewLines = noNewLines + " ";
                                  endIndex += 1;
                                  loopIndex += 1;
                                }

                                const excerpt = noNewLines
                                  // 150 chars on each side
                                  .slice(startIndex, endIndex);

                                const screenWidth = Dimensions.get('screen').width;

                                return (
                                  <View style={styles.excerptRow}>
                                    <ScrollView 
                                      style={styles.matchContainerScrollView}
                                      contentContainerStyle={styles.matchContentContainerScrollView}
                                      horizontal={true}
                                      onContentSizeChange={(width, height) => this.setState({ scrollViewWidth: width })}
                                      contentOffset={{ 
                                        x: this.state.scrollViewWidth 
                                          ? (this.state.scrollViewWidth / 2) - screenWidth / 2.7
                                          : 500, 
                                        y: 0 ,
                                      }}
                                    >
                                        <Text
                                          style={styles.excerptText}
                                          selectable={true}
                                        >
                                          {excerpt.slice(0, 150)}
                                          <Text style={{ color: 'blue' }}>
                                            {excerpt.slice(150, 150 + searchTerm.length)}
                                          </Text>
                                          {excerpt.slice(150 + searchTerm.length)}
                                        </Text>

                                    </ScrollView>
                                    <TouchableOpacity
                                      style={styles.openExcerptButton}
                                      onPress={() => this.props.navigate('excerpt', { excerpt: c.content, index: i, term: searchTerm })}
                                    >
                                      <Image
                                        source={assets.open_with}
                                        style={styles.openExcerptIcon}
                                      />
                                    </TouchableOpacity>
                                  </View>
                                );
                              })
                            }
                          </>
                        ))
                      }
                    </>
                  ))
                }
              </>
            ))
          }
        </ScrollView>
    )
  }
}