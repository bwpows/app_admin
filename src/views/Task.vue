<script setup lang="ts">
import {ref, onMounted, Ref} from 'vue';
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


const taskStatusList = ref([
  { text: '已完成', value: 1 },
  { text: '未完成', value: 2 },
  { text: '已超时', value: 3 },
  { text: '未超时', value: 4 },
])

let selectedStatus = ref(undefined)

let page_count: Ref<Number> = ref(20)
let current_page: Ref<Number> = ref(1)
let total: Ref<Number> = ref(0)
let loading: Ref<boolean> = ref(true)

onMounted(() => {
  getAll()
})

// 获取任务
async function getAll(){
  let obj:any = {
    current_page: current_page.value,
    page_count: page_count.value,
      ...changeConditions()
  }

  loading.value = true
  let res = await getAllTask(obj)
  if(res.code == 200) {
    taskTableData.value = res.data.data || [];
    total.value = res.data.total
  }
  loading.value = false
}


function changeConditions(){
    if(selectedStatus.value == 1){
        return {
            is_completed: true
        }
    }else if(selectedStatus.value == 2){
        return {
            is_completed: false
        }
    }else if(selectedStatus.value == 3) {
        return {
            is_timeout: true
        }
    }else if(selectedStatus.value == 4) {
        return {
            is_timeout: false
        }
    }
}


// 删除任务
async function deleteTaskById(item:any){
  item.deleteLoading = true
  let res = await deleteTask(item._id)
  if(res.data.code === 200) {
    await getAll()
  }
}

</script>

<template>
  <v-card class="pa-4 ma-6 rounded-lg" flat>
      <div class="mb-4">
          <v-select
              v-model="selectedStatus"
              :items="taskStatusList"
              hide-details
              color="primary rounded"
              item-title="text" item-value="value"
              style="max-width: 240px;"
              variant="outlined"
              density="comfortable"
              label="请选择状态"
              @update:modelValue="getAll()"
          ></v-select>
      </div>

      <DataTable v-if="!loading" :headers="taskTableHeader" :items="taskTableData">
          <template #end_date="{ item }">
              {{ TimeFun.formatTime(new Date(item), 'yyyy-MM-dd HH:ss') }}
          </template>
          <template #created_time="{ item }">
              {{ TimeFun.formatTime(new Date(item), 'yyyy-MM-dd HH:ss') }}
          </template>
          <template #status="{ items }">
              <v-chip color="success" size="small" v-if="items.is_cancel">已取消</v-chip>
              <v-chip color="success" size="small" v-else-if="items.is_completed">已完成</v-chip>
              <v-chip color="error" size="small" v-else>未完成</v-chip>
          </template>
          <template #operate="{ items }">
            <v-btn color="error" size="small" flat @click="deleteTaskById(items)" :loading="items.deleteLoading">删除</v-btn>
          </template>
          <template #creator="{ items }">
              <div v-if="items.users && items.users[0]">{{ items.users[0].username || '' }}</div>
              <div v-else></div>
          </template>
      </DataTable>

      <v-pagination
          class="mt-3"
          v-model="current_page"
          :length="Math.ceil(total/page_count)"
          :total-visible="7"
          @update:modelValue="getAll()"
      ></v-pagination>
  </v-card>
</template>