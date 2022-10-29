import axios from "axios";
import state from "./store/state";

const http = axios.create({
    baseURL: state.baseURL,
    headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
});

export default http;
