<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAllUser } from '../api/customer';
import http from '../axios/index';
import { CustomerDto } from '../types/customer';


const taskTableHeader = [
  { text: '头像', value: 'pictrue' },
  { text: '创建时间', value: 'create_time' },
  { text: '昵称', value: 'username' },
  { text: '手机号', value: 'phone' },
  { text: '邮箱', value: 'email' },
  { text: '角色', value: 'role' },
  { text: '操作', value: 'operate' },
]

onMounted(() => {
  getClient()
})

// let taskTableData = ref<CustomerDto[] | null>(null)
let taskTableData = ref(null)

const getClient = async ()=>{
  let res = await getAllUser()
  if(res.data.code == 200){
    taskTableData.value = (res.data.data || [])
  }
}


</script>

<template>
  <v-card class="pa-4 ma-6 rounded-lg" flat>
    <v-table>
      <thead>
        <tr>
          <th class="text-left" v-for="item in taskTableHeader" :key="item.text">
            {{ item.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item,index in taskTableData"
          :key="index"
        >
          <td v-for="(header, index) in taskTableHeader" :key="index">
            <div v-if="header.value == 'pictrue' && item[header.value] ">
              <v-img :src="http.baseUrl + '/' + item[header.value] " style="width: 36px;" class="rounded-lg ma-1"></v-img>
            </div>
            <div v-else-if="header.value == 'operate'">
              <v-btn color="warning" size="small" flat>冻结</v-btn>
              <v-btn color="error" size="small" flat class="ml-4">删除</v-btn>
            </div>
            <div v-else>
              {{ item[header.value] }}
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>