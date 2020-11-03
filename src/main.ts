import fetch from "node-fetch";
import Apollo, { gql, ApolloServer } from "apollo-server";

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Item {
    id: String
    value: String
  }

  type Facet {
    name: String
    display_name: String
    options: [FacetOption]
  }

  type FacetOption {
    value: String
    display_name: String
    top_products: [Item]
  }


  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    facets: [Facet]
  }
`;

const resolvers = {
  Query: {
    facets: async () => {
      const r = await (
        await fetch("https://ac.cnstrc.com/search/?key=u7PNVQx-prod-en-us")
      ).json();

      r.response.facets.forEach(facet => {
        facet.options = (facet.options || []).slice(0, 2).map(option => ({ ...option, facet }));
      });

      return r.response.facets.slice(0, 2);
    },
  },
  FacetOption: {
    async top_products(parent) {
      console.log(parent);
      const r = await (
        await fetch(`https://ac.cnstrc.com/browse/${parent.facet.name}/${parent.value}?key=u7PNVQx-prod-en-us`)
      ).json();


      return r.response.results.map(result => ({ id: result.data.id, value: result.value }));
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
