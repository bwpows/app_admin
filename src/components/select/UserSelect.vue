<script setup lang="ts">

import {onMounted, ref} from "vue";
import {getAllUser} from "@/api/customer";

let allUsers = ref([])
let selectUser = ref<any>()
let loading = ref<boolean>(true)

let props = defineProps({
    width: {
        type: String,
        default: '280px'
    },
    label: {
        type: String,
        default: '请选择用户'
    }
})

const emitEvent = defineEmits(['confirmEvent'])

onMounted(() => {
    getData()
})

// 获取用户列表
const getData = async () => {
    let res = await getAllUser()
    loading.value = false
    if(res.code == 200){
        allUsers.value = res.data
    }
}

// 选择用户
const selectUserEvent = () => {
    emitEvent('confirmEvent', selectUser.value?._id)
}

</script>
<template>

    <v-combobox
        :loading="loading"
        :items="allUsers"
        v-model="selectUser"
        item-title="username"
        item-value="_id"
        :style="{maxWidth: width}"
        :label="label"
        @update:modelValue="selectUserEvent"
    ></v-combobox>

</template>
