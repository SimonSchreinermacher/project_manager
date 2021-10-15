import axios from 'axios';

export function axiosAuthenticatedCall(httpMethod, url, data, onSuccess, onError) {
    axios.all([
        axios.post("http://localhost:8080/refreshtoken", {token: localStorage.getItem("token")}),
        axios({method: httpMethod, url: url, data: data})
    ])
    .then(axios.spread((res1, res2) => {
        localStorage.setItem("token", res1.data);
        onSuccess(res2);
    }))
    .catch((err) => {
        if(err.request && !err.response){   //Backend not reachable
            localStorage.removeItem("token");
        }
        onError(err);
    })
}