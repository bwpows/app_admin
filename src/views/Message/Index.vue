<template>
    <v-card class="pa-4 ma-6 rounded-lg" flat>
        <DataTable v-if="!loading" :headers="taskTableHeader" :items="taskTableData"></DataTable>
    </v-card>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import {getMessagesApi} from "@/api/message";
import {taskTableHeader} from "@/views/Message/data";

type MessageType = {
    created_time: string,
    phone: string,
    email: string,
    msg: string,
}

onMounted( () => {
    getMessage()
})



let taskTableData = ref<MessageType[]>()
let loading = ref<boolean>(true)

const getMessage = async () => {
    let res = await getMessagesApi()
    console.log(res)
    loading.value = false
    if(res.code == 200){
        taskTableData.value = res.data
    }
}


</script>

<style scoped>

</style>