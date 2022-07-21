import http from '../axios/index';


export function getAllWork(){
    return http.request({
        url: '/publish/',
        method: 'get',
    })
}