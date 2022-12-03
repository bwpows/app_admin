import http from "@/axios";

/**
 * 查看作品相关接口
 */

export function getTodayView(){
    return http.request({
        url: '/view/today',
        method: 'GET',
    })
}
