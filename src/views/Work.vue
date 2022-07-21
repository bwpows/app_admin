<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAllWork } from '../api/work';
import TimeFun from '../utils/formatTime';


interface taskHeaderDTO {
  text: string;
  value: string;
  width?: string;
}

const taskTableHeader: taskHeaderDTO[] = [
  { text: '创建时间', value: 'created_time', width: '160px' },
  { text: '标题', value: 'title' },
  { text: '内容', value: 'description' },
  { text: '浏览量', value: 'views', width: '80px' },
  { text: '喜欢量', value: 'likes', width: '80px' },
  { text: '公开作品', value: 'is_public', width: '80px' },
  { text: '创建者', value: 'creator', width: '80px' },
  { text: '状态', value: 'status' },
  { text: '操作', value: 'operate' }
]

let taskTableData:any = ref(null)

onMounted(() => {
  getAll()
})

async function getAll(){
  let res = await getAllWork()
  if(res.data.code == 200) taskTableData.value = res.data.data || [];
}

</script>

<template>
  <v-card class="pa-4 ma-6 rounded-lg" flat>
    <v-table>
      <thead>
        <tr>
          <th class="text-left" v-for="item in taskTableHeader" :key="item.text" :style="{'width': item.width}">
            {{ item.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item,index in taskTableData" :key="index">
          <td v-for="(header, index) in taskTableHeader" :style="{'width': header.width}">
            <div v-if="header.value == 'status'" :key="index">
              <v-chip :color="!item.is_delete?'success':'error'" size="small">
                {{ !item.is_delete?'正常状态':'删除状态' }}
              </v-chip>
            </div>
            <div v-else-if="header.value == 'operate'">
              <v-btn color="primary" size="small" flat class="mr-4">下架</v-btn>
              <v-btn color="success" v-if="item.status == 2" size="small" flat>恢复</v-btn>
              <v-btn color="error" v-if="item.status == 1" size="small" flat>删除</v-btn>
            </div>
            <div v-else-if="header.value == 'views'">
              {{ item[header.value].length }}
            </div>
            <div v-else-if="header.value == 'created_time' || header.value == 'end_date'">
              {{ TimeFun.formatTime(new Date(item[header.value]), 'yyyy-MM-dd HH:ss') }}
            </div>
            <div v-else-if="header.value == 'likes'">
              {{ item[header.value].length }}
            </div>
            <div v-else-if="header.value == 'is_public'">
              <v-chip :color="item.is_public?'primary':'error'" size="small">
                {{ item.is_public?'是':'否' }}
              </v-chip>
            </div>
            <div v-else-if="header.value == 'creator' && item.users.length > 0">
                {{item.users[0].username || '-'}}
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