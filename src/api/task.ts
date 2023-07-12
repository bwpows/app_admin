import http from '../axios/index';

interface AllDTO {
    readonly user_id?: string

    readonly _id?: string

    readonly is_completed?: boolean

    readonly is_deleted?: boolean

    readonly keyword?: string

    readonly current_page: number

    readonly page_count: number
}

export function getAllTask(data: AllDTO){
    return http.request({
        url: '/task/admin/all/',
        method: 'post',
        data
    })
}

export function deleteTask(_id: string){
    return http.request({
        url: '/task/admin/' + _id,
        method: 'delete',
    })
}

export function editTaskById(_id: string, data: Object) {
    return http.request({
        url: '/task/' + _id,
        method: 'PUT',
        data
    })
}