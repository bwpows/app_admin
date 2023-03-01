type HistoryHeaderDTO = {
	text: string;
	value: string;
	width?: string
}

export type HistoryType = {
	created_at: string,
	phone: string,
	username: string,
	pictrue: string,
	ip: string,
	status: number,
	type: number,
	host: string,
	user_agent: string,
	language: string,
	platform: string,
}

export enum typeEnum {
	'密码登录'= 1,
	'验证码登录',
	'微信登录'
}

export enum statusEnum {
	success = 1,
	error
}


export const historyTableHeader: HistoryHeaderDTO[] = [
	{ text: '创建时间', value: 'created_at', width: '160px' },
	{ text: '头像', value: 'pictrue' },
	{ text: '用户名', value: 'username', width: '100px' },
	{ text: '手机号', value: 'phone' },
	{ text: 'IP', value: 'ip' },
	{ text: '浏览器', value: 'user_agent' },
	{ text: '语言', value: 'language', width: '200px' },
	{ text: '平台', value: 'platform' },
	{ text: '状态', value: 'status', width: '80px' },
	{ text: '类型', value: 'type', width: '100px' },
]