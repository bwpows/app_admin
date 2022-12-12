<script setup lang="ts">
import { ref, onMounted, Ref } from 'vue';
import { getAllWork } from '@/api/work';
import TimeFun from '@/utils/formatTime';
import { taskTableHeader } from './data'

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
              <v-btn color="primary" size="small" flat class="mr-4">下架</v-btn>
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
              <v-chip :color="item?'primary':'error'" size="small">
                  {{ item?'是':'否' }}
              </v-chip>
          </template>

          <template #creator="{ items }">
              <div>
                  {{items.users[0]? items.users[0].username : '-'}}
              </div>
          </template>
      </DataTable>
  </v-card>
</template>