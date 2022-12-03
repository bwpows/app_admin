import http from '../axios/index';

export function getMessagesApi(){
    return http.request({
        url: '/message/',
        method: 'GET'
    })
}