
type TaskHeaderDTO = {
    text: string;
    value: string;
    width?: string
}


export const taskTableHeader: TaskHeaderDTO[] = [
    { text: '创建时间', value: 'created_time', width: '160px' },
    { text: '任务名称', value: 'content', width: '300px' },
    { text: '结束时间', value: 'end_date', width: '160px' },
    { text: '创建者', value: 'creator', width: '100px' },
    { text: '状态', value: 'status' },
    { text: '操作', value: 'operate' },
]