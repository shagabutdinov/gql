# Write your query or mutation here

```
query {
  search(query: "lipstick") {
    query
    recommendations {
      id
      value
      recommendations {
        id
        value
      }
    }
  }
}

query Query {
  facets {
    name
    display_name

    options {
      value
      top_products {
        id
        value
      }
    }
  }
}
```
