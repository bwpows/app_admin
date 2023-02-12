import http from '../axios/index';


export function getAllWorkOrder(){
    return http.request({
        url: '/work-order/admin',
        method: 'get',
    })
}

export function deleteWorkOrder(id: string){
    return http.request({
        url: `/work-order/${id}`,
        method: 'delete'
    })
}

export function updateWorkOrder(id: string, data: any){
    return http.request({
        url: `/work-order/status/${id}`,
        method: 'put',
        data
    })
}