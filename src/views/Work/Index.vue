<script setup lang="ts">
import { ref, onMounted, Ref } from 'vue';
import { getAllWork } from '@/api/work';
import TimeFun from '@/utils/formatTime';
import { taskTableHeader } from './data'

import EditTaskDialog from './components/Edit.vue'
let page_count: Ref<Number> = ref(20)
let current_page: Ref<Number> = ref(1)
let total: Ref<Number> = ref(0)

let taskTableData:any = ref(null)

onMounted(() => {
  getAll()
})


let loading: Ref<boolean> = ref(true)
async function getAll(){
    let res = await getAllWork()
    loading.value = false
    if(res.code == 200) taskTableData.value = res.data || [];
}

const editData = ref({
    dialog: false,
    data: {}
})

// 编辑作品
// 打开编辑作品弹窗
async function openEditWorkDialog(item: any) {
    editData.value = {
        dialog: true,
        data: item
    }
}

async function closeEditWorkDialog() {
    editData.value.dialog = false;
}

</script>

<template>

    <v-card class="pa-4 ma-6 rounded-lg" flat>

      <DataTable v-if="!loading" :headers="taskTableHeader" :items="taskTableData">
          <template #status="{ items }">
              <v-chip :color="!items.is_delete?'success':'error'" size="small">
                  {{ !items.is_delete?'正常状态':'删除状态' }}
              </v-chip>
          </template>
          <template #operate="{ items }">
              <v-btn color="primary" size="small" flat class="mr-4" @click="openEditWorkDialog(items)">编辑</v-btn>
              <v-btn color="orange" size="small" flat class="mr-4 text-white">下架</v-btn>
              <v-btn color="success" v-if="items.status == 2" size="small" flat>恢复</v-btn>
              <v-btn color="error" v-if="items.status == 1" size="small" flat>删除</v-btn>
          </template>
          <template #views="{ item }">
              {{ item.length }}
          </template>
          <template #likes="{ item }">
              {{ item.length }}
          </template>
          <template #created_time="{ items }">
              {{ TimeFun.formatTime(new Date(items.created_time), 'yyyy-MM-dd HH:ss') }}
          </template>
          <template #end_time="{ items }">
              {{ TimeFun.formatTime(new Date(items.end_time), 'yyyy-MM-dd HH:ss') }}
          </template>
          <template #is_public="{ item }">
              <v-chip :color="item?'success':'primary'" size="small">
                  {{ item?'公开':'隐私' }}
              </v-chip>
          </template>

          <template #creator="{ items }">
              <div>
                  {{items.users[0]? items.users[0].username : '-'}}
              </div>
          </template>
      </DataTable>
  </v-card>
    <EditTaskDialog :dialog="editData.dialog" :data="editData.data" @close="closeEditWorkDialog" />
</template>