import React from 'react';
import { 
  Text, 
  TouchableOpacity,
  View,
  Image,
  ImageSourcePropType,
} from 'react-native';
import styles from './styles';

interface Tab {
  icon: ImageSourcePropType;
  screen: string;
  name: string;
}

interface Props {
  tabs: Tab[];
  onPress: (screen: any) => void;
}

export default function Navbar(props: Props) {

  return (
    <View style={styles.container}>
      {
        props.tabs.map((t) => (
          <TouchableOpacity 
            style={styles.tab}
            onPress={() => props.onPress(t.screen)}
          >
            <View
              style={styles.imageContainer}
            >
              <Image
                source={t.icon}
                resizeMode="contain"
                style={styles.image}
              />
            </View>
            <Text style={styles.text}>
              {t.name}
            </Text>
          </TouchableOpacity>
        ))
      }
    </View>
  );

}