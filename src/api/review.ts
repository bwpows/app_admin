import http from '../axios/index';

export function putReviewStatus(data: any){
    return http.request({
        url: '/auth/audit',
        method: 'put',
        data,
    })
}

export function getReviewStatus(){
    return http.request({
        url: '/auth/audit',
        method: 'get'
    })
}