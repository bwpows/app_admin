
type TaskHeaderDTO = {
    text: string;
    value: string;
    width?: string
}




export const taskTableHeader: TaskHeaderDTO[] = [
    { text: '创建时间', value: 'created_time', width: '120px' },
    { text: '消费类型', value: 'typeName', width: '80px' },
    { text: '金额', value: 'amount', width: '80px' },
    { text: '用户', value: 'userName', width: '80px' },
]
