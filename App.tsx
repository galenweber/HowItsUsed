/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import SearchPage from './app/containers/Search';
import Books from './app/containers/Library';
import Excerpt from './app/containers/Excerpt';
import Browse from './app/containers/BrowseMenu';
import BrowseByAuthor from './app/containers/Browse';
import NavBar from './app/components/NavBar';
import { SafeAreaView, StyleSheet } from 'react-native';
import assets from './app/assets';

type Screen = 'search' | 'library' | 'browse' | 'browse-by-author' | 'excerpt';

interface Props {}
interface State {
  screen: Screen;
  props: any;
}

export type Navigate = (screen: Screen, props: any) => void;

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      screen: 'search',
      props: {}
    }

    this.navigate = this.navigate.bind(this);
  }

  navigate(screen: Screen, props: any) {
    this.setState({ screen, props });
  }

  render () {

    return (
      <SafeAreaView style={styles.container}>
        {
          (() => {
            switch (this.state.screen) {
              case 'search':
                return <SearchPage navigate={this.navigate} />;
              case 'library':
                return <Books />;
              case 'browse':
                return <Browse />;
              case 'browse-by-author':
                return <BrowseByAuthor viewBy="author" />;
              case 'excerpt':
                return <Excerpt {...this.state.props} />
            }
          })()
        }
        <NavBar 
          tabs={[
            { name: 'Search', icon: assets.search, screen: 'search'},
            { name: 'Library', icon: assets.library, screen: 'library'},
            { name: 'Browse', icon: assets.browse, screen: 'browse-by-author'},
            // { name: 'Library', icon: '', screen: 'library'},
          ]}
          onPress={(screen: Screen) => this.setState({ screen })}
        />
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

