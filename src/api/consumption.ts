import http from '../axios/index';

interface AdminDto {
    readonly user_id?: string

    readonly card_id?: string

    readonly type_id?: string

    readonly current_page: number

    readonly page_count: number

}

export function getAllConsumption(data :AdminDto){
    return http.request({
        url: '/consumption/admin/getAll',
        method: 'POST',
        data
    })
}