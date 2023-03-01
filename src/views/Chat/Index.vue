<template>
    <v-card class="pa-4 ma-6 rounded-lg" flat>
        <SelectUser @confirmEvent="selectUser"></SelectUser>
        <DataTable v-if="!loading" :headers="historyTableHeader" :items="chatTableData">
            <template #created_at="{item}">
                {{ TimeFun.formatTime(new Date(item), 'yyyy-MM-dd HH:ss') }}
            </template>
        </DataTable>
    </v-card>
</template>
<script setup lang="ts">

import {computed, onMounted, Ref, ref} from "vue";
import TimeFun from '@/utils/formatTime'
import {getChatHistory} from "@/api/chat";
import {baseUrl} from "@/axios";
import SelectUser from "@/components/select/UserSelect.vue"
import {ChatType, historyTableHeader} from "@/views/Chat/data";

const loading = ref<boolean>(true)
const chatTableData = ref<ChatType[]>()

onMounted(() => {
    getHistory()
})

const getHistory = async () => {
    let res = await getChatHistory()
    loading.value = false
    if(res.code == 200){
        chatTableData.value = res.data
    }
}

</script>