<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface TaskHeaderDTO {
  text: string;
  value: string;
}

interface TaskDataDTO {
  [key: string]: string | number
}


const taskTableHeader: TaskHeaderDTO[] = [
  { text: '创建时间', value: 'created_time' },
  { text: '消费类型', value: 'typeName' },
  { text: '金额', value: 'amount' },
  { text: '用户', value: 'userName' },
]

const taskTableData: TaskDataDTO[] = [
  {
    amount: 70,
    type: 1,
    userName: '张三',
    typeName: '兼职',
    created_time: '2021-05-31',
  },
  {
    amount: 56,
    type: 2,
    userName: '李四',
    typeName: '吃饭',
    created_time: '2021-05-31',
  },
]

let snackbar = ref<Boolean>(false)

onMounted(() => {

})

const openSnackbar = () => {
    snackbar.value = true
}

</script>

<template>
<v-card class="pa-4 ma-6 rounded-lg" flat>
    <DataTable :headers="taskTableHeader" :items="taskTableData">
        <template #amount="{ items }">
            <div :class="items.type == 2?'text-error':'text-success'" class="primary--text">
                {{ items.type == 2?'-':'+' }}
                {{ items.amount }}
            </div>
        </template>
    </DataTable>
</v-card>
</template>