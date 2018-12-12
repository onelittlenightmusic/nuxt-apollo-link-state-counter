import gql from 'graphql-tag'

const argRead = (key) => gql`{ ${key} @client}`

const argReadCache = (key) => {
    return { query: argRead(key)}
}

const argWriteCache = (key, value) => {
    return {data: { [key]: value }}
}

export const readCache = (cache, key) => {
    return cache.readQuery(argReadCache(key))[key]
}

export const writeCache = (cache, key, value) => {
    return cache.writeData(argWriteCache(key, value))
}

export const argMutate = (mutation) => {
    return {
        mutation: gql`mutation { ${mutation} @client }`
    }
}

export const apolloState = (key) => {
    return {
        query: argRead(key),
        loadingKey: 'loading'
    }
}