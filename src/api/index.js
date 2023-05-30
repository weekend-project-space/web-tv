import axios from "axios";

export function listTv(url = '/tvlist.txt') {
    return axios.get(url)
}