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

## Apollo

### Apollo Advantages

- Ecosystem.
- A lot of investment on Apollo.
- Used by many companies.
- Documentation.
- Libraries.
- Features.
- Interoperability with other frameworks.
- Modern data handling with Apollo.
- Modern state management with GraphQL and Apollo.
- Convenient development experience.

### Apollo Disadvantages

- Bleeding edge.
- Under construction.
- Bold & fashionable.
- Missing competition.

## GraphQL Fundamentals

### GraphQL Operation: Query

```graphql
{
  viewer {
    name
    url
  }
}
```

- __Object__: holds data about an entity, e.g. `viewer`.
- __Field__: used to ask for specific properties in objects, e.g. `name`.

```graphql
{
  organization(login: "the-road-to-learn-react") {
    name
    url
  }
}
```

- __Argument__: value passed to a field, e.g. `login: "the-road-to-learn-react"`.

```graphql
{
  book: organization(login: "the-road-to-learn-react") {
    name
    url
  }
  company: organization(login: "facebook") {
    name
    url
  }
}
```

- __Alias__: used to rename the result of a field, e.g. `book`.

```graphql
{
  book: organization(login: "the-road-to-learn-react") { ...sharedOrganizationFields
  }
  company: organization(login: "facebook") {
    ...sharedOrganizationFields
  }
}

fragment sharedOrganizationFields on Organization {
  name
  url
}
```

- __Fragment__: used to extract the query's reusable parts.

```graphql
query ($organization: String = "the-road-to-learn-react") {
  organization(login: $organization) {
    name
    url
  }
}
```

- It is possible to pass a __variable__ to a query, e.g. `$organization`.
- __Type__: type of a field, e.g. `String`. If the type ends with `!`, the type is non-nullable.
- You can also define a default value, e.g. `= "the-road-to-learn-react"`.

```graphql
query OrganizationForLearningReact {
  organization(login: "the-road-to-learn-react") {
    name
    url
  }
}
```

- `query` is called __operation type__ and `OrganizationForLearningReact` is called __operation name__.

```graphql
query OrganizationForLearningReact(
  $organization: String!,
  $repository: String!,
  $withFork: Boolean!
) {
  organization(login: $organization) {
    name
    url
    repository(name: $repository) {
      name
      forkCount @include(if: $withFork)
    }
  }
}
```

- __Directive__: Two types of directives: an __include__ directive, which includes the field when the Boolean type is set to true; and a __skip__ directive, which excludes it instead.

### GraphQL Operation: Mutation

```graphql
mutation AddStar($repositoryId: ID!) {
  addStar(input: { starrableId: $repositoryId }) {
    starrable {
      id
      viewerHasStarred
    }
  }
}
```

### GraphQL Pagination

```graphql
query OrganizationForLearningReact {
  organization(login: "the-road-to-learn-react") {
    name
    url
    repositories(first: 2, after: "Y3Vyc29yOnYyOpHOA8awSw==") {
      totalCount edges {
         node {
           name
          }
        }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}
```

- `first` sepcifies how many items from the list are expected in the result.
- `after` is the entry point for the next page.
- `endCursor` is the cursor of the last item on the list. It can be used to retrieve a successive list of items.
- `hasNextPage` gives info about whether there is a next page to retrieve.
