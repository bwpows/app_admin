import http from '../axios/index';


export function getAllUser(){
    return http.request({
        url: '/user/all',
        method: 'get',
    })
}

export function delUserById(id: string){
    return http.request({
        url: `/user/${id}`,
        method: 'delete'
    })
}

export function removeUserById(id: string){
    return http.request({
        url: `/user/delete/${id}`,
        method: 'delete'
    })
}