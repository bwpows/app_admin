import http from '../axios/index';

interface AllDTO {
    readonly user_id?: String

    readonly _id?: String

    readonly is_completed?: Boolean

    readonly is_deleted?: Boolean

    readonly keyword?: String

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