<script lang="ts" setup>

import {defineEmits} from "vue";

let props = defineProps({
    dialog: {
        type: Boolean,
        required: true,
        default: false
    },
    title: {
        type: String,
        default: "删除操作"
    },
    content: {
        type: String,
        default: "确定要删除这个内容?"
    },
    loading: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['confirmEvent', 'cancelEvent'])

const confirmEvent = () => {
    emit('confirmEvent')
}

const cancelEvent = () => {
    emit('cancelEvent')
}

</script>

<template>
    <v-dialog v-model="props.dialog">
        <v-card class="pa-6" style="width: 450px;">
            <div v-if="props.title" class="text-h6">{{ props.title }}</div>
            <div v-if="props.content" class="my-4">{{ props.content }}</div>
            <div class="d-flex justify-end mt-3">
                <v-btn color="error" class="mr-8" variant="outlined" @click="confirmEvent" :loading="props.loading">删除</v-btn>
                <v-btn color="primary" flat @click="cancelEvent" :disabled="props.loading">取消</v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>