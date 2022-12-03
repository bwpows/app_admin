<script setup lang="ts">
import {ref, onMounted, Ref} from 'vue';
import {delUserById, getAllUser, removeUserById} from '@/api/customer';
import http from '@/axios/index';
import TimeFun from '@/utils/formatTime'
import DeleteDialog from '@/components/dialog/DeleteDialog.vue'

onMounted(() => {
    getClient()
})

const taskTableHeader = [
  { text: '头像', value: 'pictrue' },
  { text: '创建时间', value: 'create_time' },
  { text: '昵称', value: 'username' },
  { text: '手机号', value: 'phone' },
  { text: '邮箱', value: 'email' },
  { text: '角色', value: 'role' },
  { text: '状态', value: 'is_delete' },
  { text: '操作', value: 'operate', width: '180px' },
]

let deleteDialog: Ref<any> = ref({
    dialog: false,
    loading: false,
    title: '',
    content: '',
    _id: ''
})

let taskTableData = ref([])

const getClient = async ()=>{
  let res = await getAllUser()
  if(res.code == 200){
    taskTableData.value = (res.data || [])
  }
}

const openDeleteDialog = (item: any, type: number) => {
    deleteDialog.value = {
        dialog: true,
        _id: item._id,
        type: type,
        content: `是否要${type == 1?'删除':'彻底删除'}用户${item.username}?`,
        title: `${type == 1?'删除':'彻底删除'}用户`
    }
}

const closeDeleteDialog = () => {
    deleteDialog.value = {
        dialog: false
    }
}

const deleteUser = async () => {
    deleteDialog.value.loading = true
    let res:any = {}
    if(deleteDialog.value.type == 1){
        res = await delUserById(deleteDialog.value._id)
    } else {
        res = await removeUserById(deleteDialog.value._id)
    }
    if(res.code == 200){
        closeDeleteDialog()
        getClient()
    }
}

</script>

<template>
    <v-card class="pa-4 ma-6 rounded-lg" flat>
          <DataTable :headers="taskTableHeader" :items="taskTableData">
              <template #create_time="{ item }">
                  {{ TimeFun.formatTime(new Date(item), 'yyyy-MM-dd HH:ss') }}
              </template>
              <template #operate="{ items }">
                  <v-btn color="warning" size="small" flat>冻结</v-btn>
                  <v-btn color="error" size="small" flat class="ml-4" v-if="items.is_delete !== true" @click="openDeleteDialog(items, 1)">删除</v-btn>
                  <v-btn color="error" size="small" flat class="ml-4" v-else @click="openDeleteDialog(items, 2)">彻底删除</v-btn>
              </template>
              <template #pictrue="{ items }">
                  <v-img v-if="items.pictrue" :src="http.baseUrl + '/' + items.pictrue " style="width: 36px;" class="rounded-lg ma-1"></v-img>
              </template>
              <template #is_delete="{ item }">
                  <v-chip size="small" :color="item == true?'red':'success'">{{ item == true?'删除':'正常' }}</v-chip>
              </template>
          </DataTable>
    </v-card>
    <DeleteDialog :dialog="deleteDialog.dialog" @confirmEvent="deleteUser" @cancelEvent="closeDeleteDialog" :loading="deleteDialog.loading" :title="deleteDialog.title" :content="deleteDialog.content" />
</template>