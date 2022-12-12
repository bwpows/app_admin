
type TaskHeaderDTO = {
    text: string;
    value: string;
    width?: string
}


export const taskTableHeader: TaskHeaderDTO[] = [
    { text: '头像', value: 'pictrue' },
    { text: '创建时间', value: 'create_time', width: '160px' },
    { text: '昵称', value: 'username' },
    { text: '手机号', value: 'phone' },
    { text: '邮箱', value: 'email', width: '120px'},
    { text: '角色', value: 'role', width: '80px'},
    { text: '状态', value: 'is_delete' },
    { text: '操作', value: 'operate', width: '180px' },
]