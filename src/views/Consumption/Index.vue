<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {AdminDto, taskTableHeader} from "@/views/Consumption/data";
import {getAllConsumption} from "@/api/consumption";


interface TaskDataDTO {
    [key: string]: string | number
}

let taskTableData = ref<TaskDataDTO[]>([])

onMounted(() => {
    getData()
})

let current_page = ref<number>(1)
let page_count = ref<number>(20)

const getData = async () => {
    let obj: AdminDto = {
        page_count: page_count.value,
        current_page: current_page.value
    }
    let res = await getAllConsumption(obj)
    console.log(res.data)
    if(res.code == 200){
        taskTableData.value = res.data.data
    }
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