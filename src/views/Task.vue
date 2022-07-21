<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { getAllTask, deleteTask } from '../api/task';
import TimeFun from '../utils/formatTime'

interface TaskHeaderDTO {
  text: string;
  value: string;
}

const taskTableHeader: TaskHeaderDTO[] = [
  { text: '创建时间', value: 'created_time' },
  { text: '任务名称', value: 'content' },
  { text: '结束时间', value: 'end_date' },
  // { text: '是否取消', value: 'is_cancel' },
  // { text: '是否完成', value: 'is_completed' },
  { text: '状态', value: 'status' },
  { text: '创建者', value: 'creator' },
  // { text: '超时', value: 'is_timeout' },
  { text: '操作', value: 'operate' },
]

let taskTableData:any = ref(null)

const taskStatusList = [
  { text: '已完成', value: 1 },
  { text: '未完成', value: 2 },
  { text: '已超时', value: 3 },
  { text: '未超时', value: 4 },
]

let selectedStauts = ref(0)

let page_count = ref(20)
let current_page = ref(1)
let total = ref(0)
let loading = ref(true)

onMounted(() => {
  getAll()
})

let select = ref('FL')
let items = ref([
  { state: 'Florida', abbr: 'FL' },
  { state: 'Georgia', abbr: 'GA' },
  { state: 'Nebraska', abbr: 'NE' },
  { state: 'California', abbr: 'CA' },
  { state: 'New York', abbr: 'NY' },
])


async function getAll(){
  let obj = {
    current_page: current_page.value,
    page_count: page_count.value
  }
  loading.value = true
  let res = await getAllTask(obj)
  if(res.data.code == 200) {
    taskTableData.value = res.data.data || [];
    total.value = res.data.total
  }
  loading.value = false
}

async function deleteTaskById(item:any){
  item.deleteLoading = true
  let res = await deleteTask(item._id)
  if(res.data.code === 200) {
    getAll()
  }
}


</script>

<template>
  <v-card class="pa-4 ma-6 rounded-lg" flat>
    <v-table class="border_grey">
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
            <div v-if="header.value == 'operate'">
              <v-btn color="error" size="small" flat @click="deleteTaskById(item)" :loading="item.deleteLoading">删除</v-btn>
            </div>
            <div v-else-if="header.value == 'created_time' || header.value == 'end_date'">
              {{ TimeFun.formatTime(new Date(item[header.value]), 'yyyy-MM-dd HH:ss') }}
            </div>
            <div v-else-if="header.value == 'status'">
               <v-chip color="success" size="small" v-if="item.is_cancel">已取消</v-chip>
               <v-chip color="success" size="small" v-else-if="item.is_completed">已完成</v-chip>
               <v-chip color="error" size="small" v-else>未完成</v-chip>
            </div>
            <div v-else>
              {{ item[header.value] }}
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
    <!-- <v-divider class=""></v-divider> -->
    <v-pagination
      class="mt-3"
      v-model="current_page"
      :length="Math.ceil(total/page_count) + 1"
      :total-visible="7"
      @update:modelValue="getAll()"
    ></v-pagination>
    <!-- </div> -->
  </v-card>
</template>