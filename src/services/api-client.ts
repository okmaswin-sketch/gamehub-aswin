import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "30c8a82f3a1b4f06968268ff30c2855c",
  },
});
