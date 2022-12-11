import axios from 'axios';

const interceptor = () => {

    axios.interceptors.request.use(
        config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = token
        }
        return config
        },
        error => {
        Promise.reject(error)
        }
    )

    axios.interceptors.response.use(
        response => {
            return response;
        },
        error => {
            if(error.response.status == 401){
                window.location = "/"
                localStorage.removeItem('token')
            }
        }
    );
}

export default interceptor