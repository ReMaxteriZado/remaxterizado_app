import axios from "axios";
import state from "./store/state";

const http = axios.create({
  baseURL: state.baseURL,
});

export default http;
