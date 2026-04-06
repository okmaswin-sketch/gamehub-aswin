import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "0bed477348be4065bf1fa9e48021482c",
  },
});
