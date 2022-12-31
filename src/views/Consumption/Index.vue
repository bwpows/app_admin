<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {AdminDto, taskTableHeader} from "@/views/Consumption/data";
import {getAllConsumption} from "@/api/consumption";
import formatTime from "@/utils/formatTime";
import UserSelect from "@/components/select/UserSelect.vue";
import CardSelect from "@/components/select/CardSelect.vue";


interface TaskDataDTO {
    [key: string]: string | number
}

let taskTableData = ref<TaskDataDTO[]>([])

onMounted(() => {
    getData()
})

let select_user_id = ref<string>()
let select_card_id = ref<string>()
let current_page = ref<number>(1)
let page_count = ref<number>(20)
let total = ref<number>(0)

// 选择客户事件
const selectUser = (_id: string) => {
    select_user_id.value = _id
    getData()
}

// 选择银行卡事件
const selectCard = (_id: string) => {
    select_card_id.value = _id
    getData()
}


// 获取消费数据
const getData = async () => {
    let obj: AdminDto = {
        page_count: page_count.value,
        current_page: current_page.value
    }
    if(select_user_id.value) obj.user_id = select_user_id.value
    if(select_card_id.value) obj.card_id = select_card_id.value
    let res = await getAllConsumption(obj)
    if(res.code == 200){
        taskTableData.value = res.data.data
        total.value = res.data.total
    }
}

</script>

<template>
    <v-card class="pa-4 ma-6 rounded-lg" flat>
        <div class="d-flex">
            <UserSelect @confirmEvent="selectUser" class="mr-8" />
            <CardSelect @confirmEvent="selectCard" />
        </div>
        <DataTable :headers="taskTableHeader" :items="taskTableData">
            <template #amount="{ items }">
                <div :class="items.type == 2?'text-error':'text-success'" class="primary--text">
                    {{ items.type == 2?'-':'+' }}
                    {{ items.amount }}
                </div>
            </template>
            <template #users="{item}">
                {{ item[0].username }}
            </template>
            <template #created_time="{item}">
                {{ formatTime.formatTime(new Date(item), 'yyyy-MM-dd HH:mm:ss') }}
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
</template>