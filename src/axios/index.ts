import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import { store } from "../store";
import router from "@/router";

// interface returnResult {
//     code: number,
//     message: string,
//     data?: Object
// }

export const baseUrl = process.env.NODE_ENV == 'production'?'https://app.bwpow.com:3000/':'https://192.168.3.72:3000/'
// export const baseUrl = 'https://app.bwpow.com:3000/'

class HttpRequest {
    public readonly baseUrl: string;

    constructor() {
        this.baseUrl = baseUrl
        // this.baseUrl = process.env.NODE_ENV == 'production'?'https://app.bwpow.com:3000/':'https://192.168.3.3:3000/';
    }

    async login() {
        localStorage.removeItem('token');
        await router.replace('/sign-in')
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
            if(response.status === 200 || response.status === 201) {
                return response.data;
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
            }else if(error.response.status === 400){
                store.commit('setSnackbar', {
                    show: true,
                    message: error.response.data.message || '参数错误'
                })
                return Promise.reject(error);
            }else if(error.response.status === 403){
                this.login()
                return Promise.reject(error);
            }else{
                store.commit('setSnackbar', {
                    show: true,
                    message: '系统错误，错误码 ' + error.response.status
                })
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