import http from '../axios/index';

const baseUrl = '/login/'

export function getAllHistory(){
	return http.request({
		url: baseUrl,
		method: 'GET'
	})
}