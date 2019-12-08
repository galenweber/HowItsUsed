import React from 'react';
import { 
  View, 
  ScrollView,
  Text, 
} from 'react-native';
import globalStyles from '../../styles/index';
import styles from './styles';

interface Props {
  excerpt: string;
  index: number;
  term: string;
}
interface State {
}

export default class Excerpt extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
    }

  }

  componentDidMount() {

  }

  render() {

    const {
      excerpt,
      term,
      index,
    } = this.props;

    return (
      <ScrollView 
        contentContainerStyle={globalStyles.container}
      >
        <Text
          selectable={true}
          style={styles.excerptText}
        >
          {excerpt.slice(0, index)}
          <Text style={{ color: 'blue' }}>
            {excerpt.slice(index, index + term.length)}
          </Text>
          {excerpt.slice(index + term.length)}
        </Text>
      </ScrollView>
    )
  }
}