import defaultsDeep from 'lodash/defaultsDeep';

export const fetchBase = async <T>(baseUrl: string|undefined, route: string, options: RequestInit = {}): Promise<T> => {
  if (!baseUrl) {
    throw Error('Base url is not defined');
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const response = await fetch(`${baseUrl}${route}`, defaultsDeep(options, {
    headers,
  }));

  return response.json();
};
