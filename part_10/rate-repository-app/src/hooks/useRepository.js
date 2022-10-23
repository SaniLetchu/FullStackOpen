import { useQuery } from '@apollo/client';
import { GET_REPOSITORY_BY_ID } from '../graphql/queries';

const useRepository = ({ id }) => {
  const variables = { id };
  const { data, error, loading } = useQuery(GET_REPOSITORY_BY_ID, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  return { repository: data?.repository, loading };
};

export default useRepository;