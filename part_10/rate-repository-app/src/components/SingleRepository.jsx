import { View, StyleSheet, Pressable, Linking, FlatList } from 'react-native';
import Text from './Text';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import useRepository from '../hooks/useRepository';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10
  },
  button: {
    padding: 20,
    borderRadius: 4,
    backgroundColor: '#0366d6',
    alignItems: 'center'
  },
  textStyle: {
    color: 'white',
  },
  separator: {
    height: 10,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository= () => {
  const { id } = useParams()
  const { repository, loading} = useRepository({ id });

  const reviewNodes = repository
    ? repository.reviews.edges.map(edge => edge.node)
    : [];
  


  if(loading) return null;

  return (
    <>
      <FlatList
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem item={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => (<><RepositoryItem item={repository} /><View style={styles.container}>
        <Pressable onPress={async () => await Linking.openURL(repository.url)} style={styles.button}>
          <Text fontWeight={'bold'} style={styles.textStyle}>
            Open in GitHub
          </Text>
        </Pressable>
      </View></>)}
      />
    </>
  );
};

export default SingleRepository;