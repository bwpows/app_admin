<script setup lang="ts">

import {onMounted, ref} from "vue";
import {getAllUser} from "@/api/customer";
import {getAllCards} from "@/api/card";

let allCards = ref([])
let selectCard = ref<any>()
let loading = ref<boolean>(true)

let props = defineProps({
    width: {
        type: String,
        default: '280px'
    },
    label: {
        type: String,
        default: '请选择银行卡'
    }
})

const emitEvent = defineEmits(['confirmEvent'])

onMounted(() => {
    getData()
})

// 获取用户列表
const getData = async () => {
    let res = await getAllCards()
    loading.value = false
    console.log(res)
    if(res.code == 200){
        allCards.value = res.data
    }
}

// 选择用户
const selectCardEvent = () => {
    emitEvent('confirmEvent', selectCard.value?._id)
}

</script>
<template>

    <v-combobox
        :loading="loading"
        :items="allCards"
        v-model="selectCard"
        item-title="number"
        item-value="_id"
        :style="{maxWidth: width}"
        :label="label"
        @update:modelValue="selectCardEvent"
    ></v-combobox>

</template>
