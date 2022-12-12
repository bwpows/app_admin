
<script lang="ts" setup>
import {onMounted} from "vue";

interface HeaderDto {
    text: string,
    value: string,
    width?: string
}


onMounted(()=>{
    // console.log(cardData)
})


type dataTable = {
    headers: HeaderDto[],
    items: any[]
}

defineProps<dataTable>()

</script>

<template>
    <v-table class="border_grey">
        <thead>
            <tr>
                <th class="text-left" v-for="item in headers" :key="item.text" :style="{ minWidth: item.width?item.width:'auto' }">
                    {{ item.text }}
                </th>
            </tr>
        </thead>
        <slot name="noData" v-if="items.length == 0">
            <div class="text-center py-4">
                没有数据哦
            </div>
        </slot>
        <tbody v-else>
            <tr
                v-for="(item,index) in items"
                :key="index"
            >
                <td v-for="(header, index) in headers" :key="index">
                    <slot :name="header.value" :item="item[header.value]" :items="item"> {{ item[header.value] }} </slot>
                </td>
            </tr>
        </tbody>
    </v-table>
</template>


<style scoped>

</style>