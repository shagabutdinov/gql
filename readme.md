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
```
