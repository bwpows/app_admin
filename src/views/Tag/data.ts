
type TaskHeaderDTO = {
    text: string;
    value: string;
    width?: string
}


export const tableHeader: TaskHeaderDTO[] = [
    { text: '创建时间', value: 'created_time', width: '160px' },
    { text: '图标', value: 'icon', width: '60px' },
    { text: '名称', value: 'name', width: '100px' },
    { text: '创建者', value: 'creator', width: '80px' },
    { text: '类型', value: 'type', width: '60px' },
    { text: '是否私有', value: 'is_public', width: '80px' },
    { text: '状态', value: 'is_deleted', width: '60px' },
    { text: '操作', value: 'operate', width: '180px' }
]