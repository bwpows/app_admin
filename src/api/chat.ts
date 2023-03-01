import http from '../axios/index';

const baseUrl: string = '/openai'

export function getChatHistory(){
	return http.request({
		url: baseUrl + '/admin',
		method: 'GET'
	})
}