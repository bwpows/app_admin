import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import { useRouter } from 'vue-router';

interface returnResult {
    code: number,
    message: string,
    data?: Object
}
class HttpRequest {
    public readonly baseUrl: string;

    constructor() {
        this.baseUrl = process.env.NODE_ENV == 'production'?'https://app.bwpow.com:3000/':'https://192.168.3.38:3000/'
    }

    login() {
        localStorage.removeItem('token');
        const router = useRouter()
        router.replace('/signin')
    }

    getToken() {
        return localStorage.getItem('token') || false;
    }

    getInsideConfig() {
        const config = {
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        return config;
    }

    // 请求拦截器
    interceptors(instance: AxiosInstance, url: string | number | undefined) {
        instance.interceptors.request.use((config: any) => {
            // 添加全局的loading
            // 请求头携带token
            if (this.getToken()) {
                config.headers.Authorization = 'Bearer ' + this.getToken();
            }
            return config;
        }, (error:any) => {
            return Promise.reject(error);
        })

        instance.interceptors.response.use((response: any) => {
            console.log(response)
            if(response.status === 200 || response.status === 201) {
                return response;
            }else if(response.status === 401){
                this.login()
                return Promise.reject(response);
            }else{
                return Promise.reject(response);
            }
        }, error => {
            if(error.response.status === 401){
                this.login()
                return Promise.reject(error);
            }else if(error.response.status === 403){
                console.log('你无权操作')
                this.login()
                return Promise.reject(error);
            }
        })
    }

    request(options: AxiosRequestConfig) {
        const instance = axios.create();
        options = Object.assign(this.getInsideConfig(), options);
        this.interceptors(instance, options.url);
        return instance(options);
    }

}

const http = new HttpRequest();
export default http;