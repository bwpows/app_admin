import http from '../axios/index';

const baseUrl: string = '/openai'

export function getChatHistory(data: any){
	return http.request({
		url: baseUrl + '/admin',
		method: 'GET',
		data
	})
}