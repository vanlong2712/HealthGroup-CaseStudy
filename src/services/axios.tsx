import axios from "axios";

const instance = axios.create({
  baseURL: `https://608a256b8c8043001757fbd6.mockapi.io/api/`,
});

export default instance;
