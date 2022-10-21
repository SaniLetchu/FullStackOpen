import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
  },
  button: {
    paddingTop: 20,
  },
  textStyle: {
    color: 'white',
  }
});

const AppBar = () => {
  return <View style={styles.container}>
    <AppBarTab name={'Repositories'}/>
  </View>;
};

export default AppBar;