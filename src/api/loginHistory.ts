import http from '../axios/index';

const baseUrl = '/login/'

export function getAllHistory(params: any){
	return http.request({
		url: baseUrl + 'admin',
		method: 'GET',
		params
	})
}