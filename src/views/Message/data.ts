
type TaskHeaderDTO = {
    text: string;
    value: string;
    width?: string
}


export const taskTableHeader: TaskHeaderDTO[] = [
    { text: '创建时间', value: 'created_time', width: '160px' },
    { text: '手机号', value: 'phone' },
    { text: '邮箱', value: 'email' },
    { text: '留言', value: 'msg' },
]