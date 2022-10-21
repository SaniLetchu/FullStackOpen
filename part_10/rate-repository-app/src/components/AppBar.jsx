import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
    <ScrollView horizontal={true}>
      <AppBarTab link={'/'} name={'Repositories'}/>
      <AppBarTab link={'/sign'} name={'Sign In'}/>
    </ScrollView>
  </View>;
};

export default AppBar;