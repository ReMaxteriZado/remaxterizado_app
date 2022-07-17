import axios from "axios";

const http = axios.create({
    // baseURL: "http://remaxterizado_api.test/api",
    baseURL: "https://api.remaxterizado.es/api",
    headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
});

export default http;
