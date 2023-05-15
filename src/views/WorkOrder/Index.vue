<template>
    <v-card class="pa-4 ma-6 rounded-lg" flat>
        <DataTable :headers="workOrderTableHeader" :items="taskTableData">
            <template #created_time="{item}">
                {{formatTime.formatTime(new Date(item), 'yyyy-MM-dd HH:mm:ss')}}
            </template>
            <template #status="{item, items}">
                <v-chip v-if="items.is_deleted" color="error" size="small">已删除</v-chip>
                <v-chip v-else :color="stateType[item || 10].color" size="small">{{stateType[item || 10].title}}</v-chip>
            </template>
            <template #images="{item}">
                <div class="d-flex flex-wrap">
                    <v-img class="rounded-lg ma-2" width="150px" style="max-width: 80px" v-for="image in item" :src="baseUrl + '/' +image" :key="image" aspect-ratio="1" cover></v-img>
                </div>
            </template>
            <template #operate="{items}">
                <template v-if="!items.is_deleted">
                    <v-btn size="small" color="primary" flat v-if="!items.status || items.status < 20" class="mr-3" @click="modifyWorkOrder(items._id, 20)">开始处理</v-btn>
                    <v-btn size="small" color="success" flat v-if="items.status < 30" class="mr-3" @click="modifyWorkOrder(items._id, 30)">标记完成</v-btn>
                    <v-btn size="small" color="error" flat v-if="!items.is_deleted" @click="openDeleteDialog(items)">立即删除</v-btn>
                </template>
            </template>
        </DataTable>
    </v-card>

    <DeleteDialog :dialog="deleteDialog" :loading="deleteLoading" @cancelEvent="deleteDialog = false" @confirmEvent="confirmDeleteDialog" />
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import { getAllWorkOrder, deleteWorkOrder, updateWorkOrder } from '@/api/workOrder';

import { workOrderTableHeader, stateType } from './data'

import formatTime from '@/utils/formatTime'

import DeleteDialog from '@/components/dialog/DeleteDialog.vue'

import { baseUrl } from '../../axios';

onMounted(() => {
    getWorkOrder()
})

let deleteDialog = ref<boolean>(false)

let taskTableData = ref([])

async function getWorkOrder(){
    let res = await getAllWorkOrder()
    if(res.code == 200){
        taskTableData.value = res.data
    }
}


async function modifyWorkOrder(_id: string, status: number) {
    await updateWorkOrder(_id, {status})
    getWorkOrder()
}



let deleteData:any = {}
let deleteLoading = ref<boolean>(false)

async function openDeleteDialog(item: any) {
    deleteData = item
    deleteDialog.value = true
}

async function confirmDeleteDialog() {
    deleteLoading.value = true;
    await delWorkOrder(deleteData._id)
    deleteDialog.value = false
    
}

async function delWorkOrder(_id: string) {
    let res = await deleteWorkOrder(_id)
    getAllWorkOrder()
}

</script>