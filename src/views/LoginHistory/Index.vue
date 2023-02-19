<template>
    <v-card class="pa-4 ma-6 rounded-lg" flat>
        <DataTable v-if="!loading" :headers="historyTableHeader" :items="historyTableData">
            <template #created_at="{item}">
                {{ TimeFun.formatTime(new Date(item), 'yyyy-MM-dd HH:ss') }}
            </template>
            <template #status="{item}">
                <div :class="item == 1 ? 'text-success':'text-error' ">{{ item == 1 ? '成功':'失败' }}</div>
            </template>
            <template #pictrue="{item}">
                <v-img v-if="item" :src="baseUrl + item" width="50" height="50"></v-img>
            </template>
            <template #type="{item}">
                {{ typeEnum[item] }}
            </template>
            <template #ip="{item}">
                {{ computedIp(item) }}
            </template>
        </DataTable>
    </v-card>
</template>

<script setup lang="ts">

import {computed, onMounted, ref} from "vue";
import TimeFun from '@/utils/formatTime'
import {historyTableHeader, HistoryType, typeEnum} from "@/views/LoginHistory/data";
import {getAllHistory} from "@/api/loginHistory";
import {baseUrl} from "@/axios";

onMounted( () => {
    getHistory()
})

const computedIp=computed(()=>(item:string)=>{ //计算属性传递参数
    return item.replaceAll(':', '').replaceAll('f', '')
})

let historyTableData = ref<HistoryType[]>()
let loading = ref<boolean>(true)

const getHistory = async () => {
    let res = await getAllHistory()
    loading.value = false
    if(res.code == 200){
        historyTableData.value = res.data
    }
}


</script>

<style scoped>

</style>