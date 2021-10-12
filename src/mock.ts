import { ApolloServer, gql } from 'apollo-server';
import * as casual from 'casual';

const typeDefs = gql`
  type Person {
    name: String
    age: Int
    friends: [Int]
  }

  type Query {
    persons: [Person]
    hello: String
    resolved: String
  }
`;

const resolvers = {
  Query: {
    resolved: () => 'Resolved',
  },
};

const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => 'Hello',
  Person: () => ({
    name: casual.name,
    age: () => casual.integer(0, 120),
    friends: [...new Array(casual.integer(2, 6))],
    listOfLists: () => [...new Array(3)].map((i) => [...new Array(2)]),
  }),
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  mocks,
  mockEntireSchema: false,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
