import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  gql,
  HttpLink,
} from '@apollo/client';
import { createAuthLink, AuthOptions, AUTH_TYPE } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import awsconfig from '../../src/aws-exports';
import { useSession } from '../context/auth';
import { useMemo } from 'react';

const url = awsconfig.aws_appsync_graphqlEndpoint;
const region = awsconfig.aws_appsync_region;
const httpLink = new HttpLink({ uri: url });

const Client = ({ children }) => {
  const { token } = useSession();

  const client = useMemo(() => {
    const auth = {
      type: awsconfig.aws_appsync_authenticationType,
      token,
    };
    const link = ApolloLink.from([
      createAuthLink({ url, region, auth }),
      createSubscriptionHandshakeLink({ url, region, auth }, httpLink),
    ]);

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  }, [token]);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Client;
