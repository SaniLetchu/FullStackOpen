import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Button, Menu, Divider, Provider, Searchbar } from 'react-native-paper';
import { useState } from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  searchBar: {
    margin: 15,
  },
  menuButton: {
    marginBottom: 15,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, setOrderBy, setOrderDirection, setText, text }) => {

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const onChangeSearch = query => setText(query);

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <Provider>
      <Searchbar
              style={styles.searchBar}
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={text}     
            />
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={<Button style={styles.menuButton} onPress={openMenu}>Sort order</Button>}>
              <Menu.Item onPress={() => {setOrderBy('CREATED_AT'); setOrderDirection('DESC')}} title="Latest repositories" />
              <Divider /> 
              <Menu.Item onPress={() => {setOrderBy('RATING_AVERAGE'); setOrderDirection('DESC')}} title="Highest rated repositories" />
              <Divider />
              <Menu.Item onPress={() => {setOrderBy('RATING_AVERAGE'); setOrderDirection('ASC')}} title="Lowest rated repositories" />
            </Menu>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item, index }) => (
          <RepositoryItem key={index} item={item}/>
        )}
      />
    </Provider>
  );
};

const RepositoryList = () => {
  const { repositories, setOrderBy, setOrderDirection, setText, text } = useRepositories();

  return <RepositoryListContainer repositories={repositories} setOrderBy={ setOrderBy} setOrderDirection={setOrderDirection} setText={setText} text={text}/>;
};

export default RepositoryList;