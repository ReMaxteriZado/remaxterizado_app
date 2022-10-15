import axios from "axios";
import state from "./store/state";

const http = axios.create({
    baseURL: state.baseURL,
    headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
});

export default http;
