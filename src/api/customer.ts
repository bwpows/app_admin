import http from '../axios/index';


export function getAllUser(){
    return http.request({
        url: '/user/all',
        method: 'get',
    })
}