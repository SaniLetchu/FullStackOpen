import Text from './Text';
import { View, Pressable, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
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
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const LoginForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput style={styles.input} name="username" placeholder="Username" />
      <FormikTextInput style={styles.input} secureTextEntry={true} name="password" placeholder="Password" />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={{color: 'white'}}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = ({ onSubmit }) => {
  const initialValues = {
    username: '',
    password: '',
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
    </Formik>
  );
};


export default SignIn;