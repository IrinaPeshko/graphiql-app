interface IProps {
  url: string;
  query: string;
  variables?: string;
  headers?: HeadersInit;
}
export const makeRequest: (request: IProps) => string | Promise<unknown> = (
  request
) => {
  try {
    const { query, url, variables, headers } = request;
    const trimmedVar = variables?.trim();
    const parsedVariables = trimmedVar ? JSON.parse(trimmedVar) : undefined;
    const requestBody = {
      query,
      variables: parsedVariables,
    };
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: JSON.stringify(requestBody),
    })
      .then((res) => {
        if (res) {
          return res.json();
        }
      })
      .catch((err) => {
        return `You have problem with your fetch request:\n${err}`;
      });
  } catch (err) {
    return `You have problem with your fetch request:\n${err}`;
  }
};
