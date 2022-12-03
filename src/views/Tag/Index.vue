<script setup lang="ts">

import {onMounted, ref, Ref} from "vue";
import {getAllTag} from "@/api/tag";
import CreateTag from "@/components/views/Tag/CreateTag.vue"
import TimeFun from '@/utils/formatTime'

let page_count: Ref<number> = ref(15)
let current_page: Ref<number> = ref(1)
let total: Ref<number> = ref(0)
let loading: Ref<boolean> = ref(true)

onMounted(()=>{
    getData()
})

let tableData = ref([]);
const tableHeader = ref([
    { text: '创建时间', value: 'created_time' },
    { text: '图标', value: 'icon' },
    { text: '名称', value: 'name' },
    { text: '创建者', value: 'creator' },
    { text: '类型', value: 'type' },
    { text: '是否私有', value: 'is_public' },
    { text: '状态', value: 'is_deleted' },
    { text: '操作', value: 'operate', width: '180px' }
])

async function getData() {
    let data:any = {
        current_page: current_page.value,
        page_count: page_count.value
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
                    <div v-if="items.users[0]">
                        {{ items.users[0].username }}
                    </div>
                </template>
                <template #created_time="{ item }">
                    {{ TimeFun.formatTime(new Date(item), 'yyyy-MM-dd HH:ss') }}
                </template>
                <template #operate="{ items }">
                    <v-btn flat size="small" color="primary" class="mr-4">编辑</v-btn>
                    <v-btn flat size="small" color="error">删除</v-btn>
                </template>
            </DataTable>


            <v-pagination
                class="mt-3"
                v-model="current_page"
                :length="Math.ceil(total/page_count)"
                :total-visible="7"
                @update:modelValue="getData()"
            ></v-pagination>
        </v-card>
    </div>
</template>