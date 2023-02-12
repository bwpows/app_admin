type WorkOrderHeaderDTO = {
    text: string;
    value: string;
    width?: string
}


export const workOrderTableHeader: WorkOrderHeaderDTO[] = [
    { text: '创建时间', value: 'created_time', width: '160px' },
    { text: '内容', value: 'content' },
    { text: '图片', value: 'images' },
    { text: '创建者', value: 'creator', width: '80px' },
    { text: '状态', value: 'status', width: '100px' },
    { text: '操作', value: 'operate', width: '180px' }
]

export const statuType = {
    10 : {title: '待处理', color: 'grey'},
    20 : {title: '处理中', color: 'primary'},
    30 : {title: '已完成', color: 'success'},
}
