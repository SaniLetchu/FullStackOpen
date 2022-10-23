import Text from './Text';
import { View, Pressable, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import useCreateReview from '../hooks/useCreateReview';
import { useNavigate } from "react-router-dom";
import { Formik } from 'formik';
import * as yup from 'yup';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 0,
    backgroundColor: "white",
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: 'grey',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#0366d6',
    padding: 20,
    alignItems: 'center',
    borderRadius: 3,
    marginTop: 20,
  },
});

const validationSchema = yup.object().shape({
  owner: yup
    .string()
    .required('Repository owner name is required'),
  repository: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required'),
  review: yup
    .string()
});

const LoginForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput style={styles.input} name="owner" placeholder="Repository owner name" />
      <FormikTextInput style={styles.input} name="repository" placeholder="Repository name" />
      <FormikTextInput style={styles.input} keyboardType='numeric' name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput style={styles.input} name="review" placeholder="Review" multiline={true}/>
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={{color: 'white'}}>Create a review</Text>
      </Pressable>
    </View>
  );
};

export const ReviewContainer = ({ onSubmit }) => {
  const initialValues = {
    owner: '',
    repository: '',
    rating: 0,
    review: ''
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const ReviewForm = () => {
  let navigate = useNavigate();
  const [createReview] = useCreateReview();
  const onSubmit = async (values) => {
    const { owner, repository, rating, review } = values;

    try {
      const { data } = await createReview({ ownerName: owner, repositoryName: repository, rating, text: review});
      navigate(`/repository/${data.createReview.repositoryId}`, { replace: true });    
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <ReviewContainer onSubmit={onSubmit}/>
  );
};



export default ReviewForm;