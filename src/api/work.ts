import http from '../axios/index';


export function getAllWork(){
    return http.request({
        url: '/publish/',
        method: 'get',
    })
}

export function editWorkById(_id: string, data: Object) {
    return http.request({
        url: '/publish/' + _id,
        method: 'PUT',
        data
    })
}