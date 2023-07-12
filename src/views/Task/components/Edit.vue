<script setup lang="ts">

import { ref, watch } from "vue";
import {editTaskById} from "@/api/task";

const emit = defineEmits(['close'])

const props = defineProps({
    dialog: {
        type: Boolean,
        required: true,
        default: false
    },
    title: {
        type: String,
        default: "编辑任务"
    },
    data: {
        type: Object,
        default: {}
    }
})

const taskData = ref<any>({
    dialog: false,
    loading: false
})

watch(props, () => {
    taskData.value = JSON.parse(JSON.stringify(props.data))
    taskData.value.created_time = new Date(taskData.value.created_time || '').toISOString().substring(0,16)
    taskData.value.end_date = new Date(taskData.value.end_date || '').toISOString().substring(0,16)
})

const close = () => {
    emit("close")
}

const save = async () => {
    // 保存
    const obj = {
        content: taskData.value.content,
        created_time: taskData.value.created_time,
        end_date: taskData.value.end_date,
    }
    taskData.value.loading = true
    await editTaskById(taskData.value._id, obj)
    taskData.value.loading = false
    close()
}


</script>

<template>
    <v-row justify="center">
        <v-dialog
            v-model="dialog"
            persistent
            width="500"
        >
            <v-card class="pa-4">
                <v-card-title>
                    <span class="text-h5">{{title}}</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field
                        v-model="taskData.content"
                        label="任务内容"
                        required
                    ></v-text-field>
                    <v-text-field
                        label="开始时间"
                        v-model="taskData.created_time"
                        type="datetime-local"
                        required
                    ></v-text-field>
                    <v-text-field
                        label="结束时间"
                        v-model="taskData.end_date"
                        type="datetime-local"
                        required
                    ></v-text-field>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue-darken-1"
                        variant="text"
                        @click="close"
                    >
                        取消
                    </v-btn>
                    <v-btn
                        color="blue-darken-1"
                        variant="text"
                        @click="save"
                        :loading="taskData.loading"
                    >
                        保存
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>