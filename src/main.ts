import fetch from "node-fetch";
import Apollo, { gql, ApolloServer } from "apollo-server";
import GraphQLJSON from "graphql-type-json";

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  scalar JSON

  type Item {
    id: String
    value: String
    recommendations: [Item]
    explanation: ItemExplanation
  }

  type ItemExplanation {
    is_slotted: Boolean
    computed_score: Int
    conversion_rules_boost: Int
    query_refinement_boost: Int
    final_score: Int
  }

  type Facet {
    name: String
    display_name: String
    data: JSON
    options(limit: Int!, data: [String]): [FacetOption]
  }

  type FacetOption {
    value: String
    display_name: String
    top_products(limit: Int!): [Item]
  }

  type Search {
    query: String
    items: [Item]
    recommendations: [Item]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    facets(limit: Int!): [Facet]
    search(query: String): Search
  }
`;

const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    facets: async (_, args) => {
      const r = await (
        await fetch("https://ac.cnstrc.com/search/?key=u7PNVQx-prod-en-us")
      ).json();

      return r.response.facets.slice(0, args.limit);
    },
    search: async (_, args) => {
      const r = await (
        await fetch(
          `https://ac.cnstrc.com/search/${args.query}?key=u7PNVQx-prod-en-us&explain=True`
        )
      ).json();

      return {
        ...r,
        query: args.query,
      };
    },
  },
  Search: {
    recommendations: async (parent) => {
      const r = await (
        await fetch(
          `https://ac.cnstrc.com/recommendations/v1/pods/zero_results_2?key=u7PNVQx-prod-en-us&query=${parent.query}`
        )
      ).json();

      return r.response.results.slice(0, 3);
    },
    items: async (parent) => {
      console.log("XXXX main.ts:83 ", parent);
      return parent.response.results.slice(0, 3);
    },
  },
  Item: {
    id: (parent) => {
      return parent.data.id;
    },
    explanation: (parent) => {
      return { ...parent.explanation, is_slotted: parent.is_slotted };
    },
    recommendations: async (parent) => {
      const r = await (
        await fetch(
          `https://ac.cnstrc.com/recommendations/v1/pods/cart_page_1?key=u7PNVQx-prod-en-us&item_id=${parent.data.id}`
        )
      ).json();

      return r.response.results.slice(0, 3);
    },
  },
  Facet: {
    options(parent, args) {
      console.log("XXXX main.ts:47 ", args);
      return (parent.options || [])
        .map((option) => ({ ...option, facet: parent }))
        .slice(0, args.limit);
    },
  },
  FacetOption: {
    async top_products(parent, args) {
      // console.log(parent);
      const r = await (
        await fetch(
          `https://ac.cnstrc.com/browse/${parent.facet.name}/${parent.value}?key=u7PNVQx-prod-en-us`
        )
      ).json();

      return r.response.results.slice(0, args.limit).map((result) => ({
        id: result.data.id,
        value: result.value,
      }));
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
