import { View, StyleSheet, Pressable } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  button: {
    paddingTop: 20,
  },
  textStyle: {
    color: 'white',
  }
});

const AppBarTab = ({name}) => {
  return <View>
    <Pressable style={styles.button}>
      <Text fontSize="subheading" style={styles.textStyle}>{name}</Text>
    </Pressable>
  </View>;
};

export default AppBarTab;