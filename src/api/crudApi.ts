import axios from 'axios';

export const CrudApi = {
  getList: (api: string, page: number) => {
    return axios.get(api, { data: { page } });
  },
  create: (api: string, data: any) => {
    return axios.post(api, data);
  },
  details(api: string, id: any) {
    return axios.get(api + '/' + id);
  },
  edit(api: string, data: any) {
    return axios.put(api + '/' + data.id, data);
  },
};
