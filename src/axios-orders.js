import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    "https://react-my-burger-48271-default-rtdb.europe-west1.firebasedatabase.app/",
});

export default axiosInstance;
