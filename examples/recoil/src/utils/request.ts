import Axios from "axios";

const axios = Axios.create();

export const request = {
  get: <Response>(url: string) => {
    return axios.get<Response>(url).then((res) => res.data);
  },
};
