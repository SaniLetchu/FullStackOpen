import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [text, setText] = useState('');
  const [value] = useDebounce(text, 500);

  const variables = { orderBy, orderDirection, searchKeyword: value };

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  return { repositories: data?.repositories, loading, setOrderBy, setOrderDirection, setText, text };
};

export default useRepositories;