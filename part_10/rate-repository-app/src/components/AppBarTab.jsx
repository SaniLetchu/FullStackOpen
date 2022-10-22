import { View, StyleSheet } from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginRight: 20,
  },
  textStyle: {
    color: 'white',
  }
});

const AppBarTab = ({name, link, onPress}) => {
  return <View style={styles.container}>
    <Link onPress={onPress} to={link}><Text style={styles.textStyle}>{name}</Text></Link>
  </View>;
};

export default AppBarTab;