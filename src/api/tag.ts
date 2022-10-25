import http from '../axios/index';


export function getAllTag(data:any){
    return http.request({
        url: '/data-type/all',
        method: 'post',
        data,
    })
}

export function addTag(data: any){
    return http.request({
        url: '/data-type/add',
        method: 'post',
        data
    })
}