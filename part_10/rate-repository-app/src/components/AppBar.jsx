import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import useLoggedIn from '../hooks/useLoggedIn';
import { useContext } from 'react';
import { useApolloClient } from '@apollo/client';
import AuthStorageContext from '../contexts/AuthStorageContext';

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
  const { logged } = useLoggedIn();
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const logout = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  }

  return <View style={styles.container}>
    <ScrollView horizontal={true}>
      <AppBarTab link={'/'} name={'Repositories'}/>
      {logged == null &&
        <AppBarTab link={'/sign'} name={'Sign In'} />
      }
      {logged != null &&
        <AppBarTab link={'/review'} name={'Create a review'}/>
      }
      {logged != null &&
        <AppBarTab onPress={logout} name={'Sign Out'}/>
      }
      {logged == null &&
        <AppBarTab link={'/signup'} name={'Sign up'} />
      }
    </ScrollView>
  </View>;
};

export default AppBar;