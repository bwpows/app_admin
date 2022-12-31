import http from '../axios/index';


export function getAllCards(){
    return http.request({
        url: '/card/admin/all',
        method: 'GET'
    })
}