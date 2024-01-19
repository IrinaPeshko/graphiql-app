import { getIntrospectionQuery } from 'graphql';

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
