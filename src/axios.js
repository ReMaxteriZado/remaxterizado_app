import axios from "axios";

const base = axios.create({
    // baseURL: "http://remaxterizado_api.test/api",
    baseURL: "https://api.remaxterizado.es/api",
    // headers: {
    //     "Access-Control-Allow-Origin": "*",
    // },
});

export default base;
