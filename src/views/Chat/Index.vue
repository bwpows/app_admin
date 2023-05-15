<template>
    <v-card class="pa-4 ma-6 rounded-lg" flat>
        <SelectUser @confirmEvent="getHistory"></SelectUser>
        <DataTable v-if="!loading" :headers="historyTableHeader" :items="chatTableData">
            <template #created_at="{item}">
                {{ TimeFun.formatTime(new Date(item), 'yyyy-MM-dd HH:ss') }}
            </template>
        </DataTable>
    </v-card>
</template>
<script setup lang="ts">

import { onMounted, ref} from "vue";
import TimeFun from '@/utils/formatTime'
import {getChatHistory} from "@/api/chat";
import SelectUser from "@/components/select/UserSelect.vue"
import {ChatType, historyTableHeader} from "@/views/Chat/data";

const loading = ref<boolean>(true)
const chatTableData = ref<ChatType[]>()

onMounted(() => {
    getHistory()
})

const getHistory = async (id?: string) => {
    let params;
    if(id){
        params = {
            user_id: id
        }
    }
    const res = await getChatHistory(params);
    loading.value = false
    if(res.code == 200){
        chatTableData.value = res.data
    }
}

</script>