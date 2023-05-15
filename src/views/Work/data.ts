
type TaskHeaderDTO = {
    text: string;
    value: string;
    width?: string
}



export const taskTableHeader: TaskHeaderDTO[] = [
    { text: '创建时间', value: 'created_time', width: '160px' },
    { text: '标题', value: 'title', width: '180px' },
    { text: '内容', value: 'description' },
    { text: '浏览量', value: 'views', width: '80px' },
    { text: '喜欢量', value: 'likes', width: '80px' },
    { text: '创建者', value: 'creator', width: '80px' },
    { text: '公开作品', value: 'is_public', width: '80px' },
    { text: '状态', value: 'status', width: '100px' },
    { text: '操作', value: 'operate' }
]