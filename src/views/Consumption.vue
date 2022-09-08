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

    <v-table>
        <thead>
            <tr>
                <th class="text-left" v-for="item in taskTableHeader" :key="item.text">
                {{ item.text }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in taskTableData" :key="item.created_time">
                <td v-for="(header, index) in taskTableHeader" :key="index">
                    <div v-if="header.value == 'amount'">
                        <div :class="item.type == 2?'text-error':'text-success'" class="primary--text">
                        {{ item.type == 2?'-':'+' }}
                        {{ item[header.value] }}
                        </div>
                    </div>
                    <div v-else>{{ item[header.value] }}</div>
                </td>
            </tr>
        </tbody>
    </v-table>
</v-card>
</template>