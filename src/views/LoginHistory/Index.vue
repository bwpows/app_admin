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
    <v-pagination
        class="mt-3"
        v-model="current_page"
        :length="Math.ceil(total/page_count)"
        :total-visible="7"
        @update:modelValue="getHistory()"
    ></v-pagination>
</template>

<script setup lang="ts">

import {computed, onMounted, Ref, ref} from "vue";
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

let page_count: Ref<number> = ref(20)
let current_page: Ref<number> = ref(1)
let total: Ref<number> = ref(0)

const getHistory = async () => {
    let res = await getAllHistory({
        current_page: current_page.value,
        page_count: page_count.value,
    })
    loading.value = false
    if(res.code == 200){
        historyTableData.value = res.data.data || [];
        total.value = res.data.total
    }
}

</script>

<style scoped>

</style>