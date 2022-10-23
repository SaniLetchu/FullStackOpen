import { View, StyleSheet, Image, Pressable } from 'react-native';
import Text from './Text';
import { useNavigate } from 'react-router-native';

function kFormatter(num) {
  return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 20,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  mainInformationContainer: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    
  },
  languageText: {
    backgroundColor: '#0366d6',
    color: 'white',
    borderRadius: 3,
    padding: 4,
    marginBottom: 5,
  },
  marginText : {
    marginBottom: 10,
    paddingRight: 60
  },
  informationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  smallInformationContainern: {
    alignItems: 'center',
  }
});


const RepositoryItem = ({item}) => {
  let navigate = useNavigate();
  return (
    <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Image style={styles.tinyLogo} source={{uri: item.ownerAvatarUrl}}></Image>
          <View style={styles.mainInformationContainer}>
            <Text testID="fullName" style={styles.marginText} fontWeight={'bold'}>{item.fullName}</Text>
            <Text testID="description" style={styles.marginText} color={'textSecondary'}>{item.description}</Text>
            <Text testID="language" style={styles.languageText}>{item.language}</Text>
          </View>
        </View>
        <View style={styles.informationContainer}>
          <View style={styles.smallInformationContainern}>
            <Text testID="stargazersCount"  fontWeight={'bold'}>{kFormatter(item.stargazersCount)}</Text>
            <Text color={'textSecondary'}>Stars</Text>
          </View>
          <View style={styles.smallInformationContainern}>
            <Text testID="forksCount"  fontWeight={'bold'}>{kFormatter(item.forksCount)}</Text>
            <Text color={'textSecondary'}>Forks</Text>
          </View>
          <View style={styles.smallInformationContainern}>
            <Text fontWeight={'bold'}>{kFormatter(item.reviewCount)}</Text>
            <Text color={'textSecondary'}>Reviews</Text>
          </View>
          <View style={styles.smallInformationContainern}>
            <Text fontWeight={'bold'}>{kFormatter(item.ratingAverage)}</Text>
            <Text color={'textSecondary'}>Rating</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default RepositoryItem;