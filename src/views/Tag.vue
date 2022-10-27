<script setup lang="ts">

import {onMounted, ref, Ref} from "vue";
import {getAllTag} from "../api/tag";
import CreateTag from "../components/views/Tag/CreateTag.vue"
import TimeFun from '../utils/formatTime'

let page_count: Ref<Number> = ref(20)
let current_page: Ref<Number> = ref(1)
let total: Ref<Number> = ref(0)
let loading: Ref<Boolean> = ref(true)

onMounted(()=>{
    getData()
})

let tableData = ref([]);
const tableHeader = ref([
    // { text: 'ID', value: '_id' },
    { text: '创建时间', value: 'created_time' },
    { text: '图标', value: 'icon' },
    { text: '名称', value: 'name' },
    { text: '创建者', value: 'creator' },
    { text: '类型', value: 'type' },
    { text: '是否私有', value: 'is_public' },
    { text: '状态', value: 'is_deleted' },
    { text: '操作', value: 'operate', width: '180px' },
])

async function getData() {
    let data:any = {
        current_page: 1,
        page_count: 20
    }
    let obj = await getAllTag(data)
    tableData.value = obj.data.data
    total.value = obj.data.total
}

</script>

<template>
    <div class="mx-4">
        <CreateTag />

        <v-card class="pa-4 my-4 rounded-lg" flat>
            <DataTable :headers="tableHeader" :items="tableData">
                <template #type="{ item }">
                    <div :class="item== 2?'text-error':'text-success'" class="primary--text">
                        {{ item == 2?'支出':'收入' }}
                    </div>
                </template>
                <template #is_public="{ item }">
                    <v-chip :color="!item?'error':'success'" size="small">
                        {{ item?'公开':'私有' }}
                    </v-chip>
                </template>
                <template #is_deleted="{ item }">
                    <v-chip :color="item?'error':'success'" size="small">
                        {{ !item?'正常状态':'删除状态' }}
                    </v-chip>
                </template>
                <template #creator="{ items }">
                    {{ items.users[0].username }}
                </template>
                <template #created_time="{ item }">
                    {{ TimeFun.formatTime(new Date(item), 'yyyy-MM-dd HH:ss') }}
                </template>
                <template #operate="{ items }">
                    <v-btn flat size="small" color="primary" class="mr-4">编辑</v-btn>
                    <v-btn flat size="small" color="error">删除</v-btn>
                </template>
            </DataTable>
        </v-card>
    </div>
</template>