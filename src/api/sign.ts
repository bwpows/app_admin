import http from '../axios/index';

export function signIn(data: any){
    return http.request({
        url: '/auth/login/phone',
        method: 'post',
        data,
    })
}