interface FetchOptions {
  token: string;
  baseUrl: string;
}

export const CrudApi = {
  getList: (options: FetchOptions, api: string) => {
    return fetch(`${options.baseUrl}/${api}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${options.token}` },
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      throw res;
    });
  },
  //TODO: fix this
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create: (options: FetchOptions, api: string, data: any) => {
    const headers: HeadersInit = { Authorization: `Bearer ${options.token}` };
    // Don't set Content-Type for FormData
    if (!(data instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    return fetch(`${options?.baseUrl ?? ''}/${api}`, {
      method: 'POST',
      headers,
      body: data instanceof FormData ? data : JSON.stringify(data),
    }).then(res => res.json());
  },
  //TODO: fix this
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details: (options: FetchOptions, api: string, id: any) => {
    return fetch(`${options?.baseUrl ?? ''}/${api}/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${options.token}` },
    }).then(res => {
      return res.json();
    });
  },
  //TODO: fix this
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  edit: (options: FetchOptions, api: string, data: any) => {
    const headers: HeadersInit = { Authorization: `Bearer ${options.token}` };
    // Don't set Content-Type for FormData
    if (!(data instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }
    return fetch(`${options?.baseUrl ?? ''}/${api}/${data.id}`, {
      method: 'PUT',
      headers,
      body: data instanceof FormData ? data : JSON.stringify(data),
    }).then(res => res.json());
  },
  delete: (options: FetchOptions, api: string, id: string) => {
    return fetch(`${options?.baseUrl ?? ''}/${api}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${options.token}` },
    }).then(res => {
      return res.clone().json();
    });
  },
};
