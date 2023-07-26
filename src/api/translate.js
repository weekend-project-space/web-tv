import axios from "axios";



export function translate(input) {
    return axios.get('/translate?&doctype=json&type=AUTO&i=' + input)
}