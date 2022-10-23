import { View, StyleSheet } from 'react-native';
import Text from './Text';
import { format, parseISO } from 'date-fns'

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
  },
  rating: {
    color: '#0366d6',
    borderWidth: 2,
    width: 44,
    height: 44,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    borderRadius: 22,
    borderColor: '#0366d6',
    alignSelf: 'flex-start',
    marginRight: 15,
  },
  timeStyle: {
    marginBottom: 5,
  },
  nameStyle : {
    marginBottom: 3,
  },
  secondaryContainer: {
    paddingRight: 50,
  }
});



const ReviewItem = ({item}) => {

  
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.rating}>{item.rating}</Text>
      <View style={styles.secondaryContainer}>
        <Text style={styles.nameStyle} fontWeight={'bold'}>{item.user.username}</Text>
        <Text style={styles.timeStyle} color={'textSecondary'}>{format(parseISO(item.createdAt), 'MM/dd/yyyy')}</Text>
        <Text>{item.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;