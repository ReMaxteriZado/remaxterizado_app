import axios from "axios";

const base = axios.create({
    baseURL: "http://remaxterizado_api.test/api",
    // baseURL: "https://www.remaxterizado.es/api/api",
});

export default base;
