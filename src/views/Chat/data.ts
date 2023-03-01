type HistoryHeaderDTO = {
	text: string;
	value: string;
	width?: string
}

export type ChatType = {
	created_at: string,
	user_id: string,
	send_message: string,
	receive_message: string,
}



export const historyTableHeader: HistoryHeaderDTO[] = [
	{ text: '创建时间', value: 'created_at', width: '160px' },
	{ text: '用户ID', value: 'user_id', width: '200px' },
	{ text: '发送信息', value: 'send_message', width: '240px' },
	{ text: '回复信息', value: 'receive_message' }
]