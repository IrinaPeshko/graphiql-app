import { getIntrospectionQuery } from 'graphql';
import { buildClientSchema } from "graphql";
// import { introspectionQuery } from "./graphqlIntrospectionQuery";

export async function getSchemaTypes(url: string) {
  const query = {
    query: getIntrospectionQuery(),
  };
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(query),
  });

  const { data } = await response.json();
  const schema = data.__schema.types;
  return schema;
}

export async function fetchGraphQLSchema(url:string) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ query: introspectionQuery }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseBody = await response.json();
      if (responseBody.errors) {
        console.error('GraphQL Errors:', responseBody.errors);
        throw new Error('GraphQL Errors');
      }
      return buildClientSchema(responseBody.data)
    } catch (error) {
      console.error('Error fetching GraphQL schema:', error);
    }
  }