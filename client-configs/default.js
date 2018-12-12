import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state';
import { readCache, writeCache } from '../apollo-link-state-store'
export default () => {
    const stateLink = withClientState({
        cache: new InMemoryCache(),
        defaults: {
            countSample: 0
        },
        resolvers: {
            Mutation: {
            increment: (obj, args, {cache}) => {
                var rtn = readCache(cache, "countSample")
                writeCache(cache, "countSample", rtn + 1)
                return null
            },
            },
        },
        });
  const link = stateLink
  return {
    link,
    cache: new InMemoryCache(),
    connectToDevTools: true
  }
}