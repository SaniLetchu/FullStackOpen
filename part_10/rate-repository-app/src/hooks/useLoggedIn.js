import { useQuery } from '@apollo/client';
import { IS_LOGGED_IN } from '../graphql/queries';

const useLoggedIn = () => {
  const { data, error, loading } = useQuery(IS_LOGGED_IN , {
    fetchPolicy: 'cache-and-network',
  });

  return { logged: data.me, loading };
};

export default useLoggedIn;