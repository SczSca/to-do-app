//I want to create a bodyType of this Record<string, string | number | null | Date | undefined>,
type bodyType = Record<string, string | number | null | Date | undefined>;

export const secureFetch = (backendUrl = "", defaultHeaders = {}) => {
  const buildQueryParams = (
    params: Record<string, string | number | boolean | null | undefined>
  ) => {
    const query = Object.entries(params)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, value]) => value !== null && value !== undefined)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
      )
      .join("&");
    return query ? `?${query}` : "";
  };
  const secureGet = async (
    endpoint: string,
    headers = {},
    queryParams = {}
  ) => {
    const queryString = buildQueryParams(queryParams);
    const response = await fetch(`${backendUrl}${endpoint}${queryString}`, {
      method: "GET",
      headers: { ...defaultHeaders, ...headers },
    });
    const responseJson = await response.json();
    return responseJson;
  };
  const securePost = async (
    endpoint: string,
    body: bodyType,
    headers = {},
    queryParams = {}
  ) => {
    const queryString = buildQueryParams(queryParams);
    return await fetch(`${backendUrl}${endpoint}${queryString}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...defaultHeaders,
        ...headers,
      },
      body: JSON.stringify(body),
    });
  };
  const securePut = (
    endpoint: string,
    body: bodyType,
    headers = {},
    queryParams = {}
  ) => {
    const queryString = buildQueryParams(queryParams);
    return fetch(`${backendUrl}${endpoint}${queryString}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...defaultHeaders,
        ...headers,
      },
      body: JSON.stringify(body),
    });
  };
  const securePatch = (
    endpoint: string,
    body: bodyType,
    headers = {},
    queryParams = {}
  ) => {
    const queryString = buildQueryParams(queryParams);
    return fetch(`${backendUrl}${endpoint}${queryString}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...defaultHeaders,
        ...headers,
      },
      body: JSON.stringify(body),
    });
  };
  const secureDelete = (endpoint: string, headers = {}, queryParams = {}) => {
    const queryString = buildQueryParams(queryParams);
    return fetch(`${backendUrl}${endpoint}${queryString}`, {
      method: "DELETE",
      headers: { ...defaultHeaders, ...headers },
    });
  };
  return {
    secureGet,
    securePost,
    securePut,
    securePatch,
    secureDelete,
  };
};
