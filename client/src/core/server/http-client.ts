import axios from "axios";
import setResponseMiddlewares from "./middlewares/response/response-middlewares";
import setRequestMiddlewares from "./middlewares/request/request-middlewares";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const http = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

setRequestMiddlewares(http);
setResponseMiddlewares(http);

export default http;
