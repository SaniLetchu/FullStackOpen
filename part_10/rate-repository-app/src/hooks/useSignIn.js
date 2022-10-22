import { useMutation } from '@apollo/client';
import { GET_ACCESSTOKEN } from '../graphql/mutations';

const useSignIn = () => {
  const [mutate, result] = useMutation(GET_ACCESSTOKEN);

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    const response = await mutate({ variables: {username, password}});
    return response
  };

  return [signIn, result];
};

export default useSignIn;