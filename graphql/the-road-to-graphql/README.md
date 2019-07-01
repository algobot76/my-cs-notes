# The Road to GraphQL

## GraphQL

### What is GraphQL?

- An open source query language created by Facebook.
- A GraphQL operation is either a query (read), mutation (write), or subscription (continuous read).
- The server application offers a GraphQL schema, where it defines all available data with its heirarchy and types, and a client application only queries the required data.

### GraphQL Advantages

- Declarative data fetching.
- No overfetching with GraphQL.
- An agnostic framework.
- Used by many big companies.
- Single source of truth
  - A central location where all available data is described.
- Modern trends.
- Schema stitching
  - Possible to create one schema out of multiple schemas.
- Introspection
  - Possible to retrieve the GraphQL schema from a GraphQL API.
- Strongly typed
  - Written in GraphQL Schema Definition Languages (SDL).
  - Less error-prone, validated during compile time.
- Better versioning than REST
  - No API verions like REST.
  - Possible to deprecate the API on a field level.
- A growing ecosystem.

### GraphQL Disadvantages

- Query complexity
  - Too many nested fields in one query.
- Rate limiting
  - A GraphQL operation can be cheap or expensive.
- Caching
  - Each query is different => hard to implement a cache.
