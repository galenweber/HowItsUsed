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
import { Book } from '../../types';
import globalStyles from '../../styles';
const arrowRight = require('./assets/keyboard_arrow_right/keyboard_arrow_right-24px.png');

interface Props {}
interface State {
  books: Book[];
  library: number[];
}

export default function Browse () {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>
        Browse
      </Text>
      <View style={globalStyles.listContainer}>
        <TouchableOpacity style={globalStyles.listItem}>
          <Text style={globalStyles.linkText}>
            By Author
          </Text>
          <View style={styles.spacer} />
          <View style={styles.listItemIcon}>
            <Image
              source={arrowRight}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.listItem}>
          <Text style={globalStyles.linkText}>
            By Title
          </Text>
          <View style={styles.spacer} />
          <View style={styles.listItemIcon}>
            <Image
              source={arrowRight}
            />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}