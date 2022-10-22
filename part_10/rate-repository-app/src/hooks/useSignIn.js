import { useMutation } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import { GET_ACCESSTOKEN } from '../graphql/mutations';
import { useContext } from 'react';
import { useApolloClient } from '@apollo/client';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
  let navigate = useNavigate();
  const [mutate, result] = useMutation(GET_ACCESSTOKEN);
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    const response = await mutate({ variables: {username, password}});
    await authStorage.setAccessToken(response.data.authenticate.accessToken);
    apolloClient.resetStore();
    navigate("/", { replace: true });    
    return response
  };

  return [signIn, result];
};

export default useSignIn;