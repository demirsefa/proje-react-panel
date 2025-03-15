
export const CrudApi = {
  getList: (api: string, page: number) => {
    return fetch(api, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page }),
    }).then((res) => res.json());
  },
  create: (api: string, data: any) => {
    return fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  },
  details(api: string, id: any) {
    return fetch(`${api}/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());
  },
  edit(api: string, data: any) {
    return fetch(`${api}/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  },
};
