<script setup lang="ts">

import {onMounted, ref, Ref} from "vue";
import {getAllTag} from "../api/tag";
import CreateTag from "../components/views/Tag/CreateTag.vue"

let page_count: Ref<Number> = ref(20)
let current_page: Ref<Number> = ref(1)
let total: Ref<Number> = ref(0)
let loading: Ref<Boolean> = ref(true)

onMounted(()=>{
    getData()
})

async function getData() {
    let data:any = {
        current_page: 1,
        page_count: 20
    }
    let obj = await getAllTag(data)
    console.log(obj)
}

</script>

<template>
    <div class="mx-4">
        <CreateTag />
    </div>
</template>