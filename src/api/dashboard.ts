import http from '../axios/index';


export function getDashboard(){
    return http.request({
        url: '/common/admin-dashboard',
        method: 'GET'
    })
}