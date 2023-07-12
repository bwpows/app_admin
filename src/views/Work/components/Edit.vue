<script setup lang="ts">

import { ref, watch } from "vue";
import {editWorkById} from "@/api/work";

const emit = defineEmits(['close'])

const props = defineProps({
    dialog: {
        type: Boolean,
        required: true,
        default: false
    },
    title: {
        type: String,
        default: "编辑作品"
    },
    data: {
        type: Object,
        default: {}
    }
})

const workData = ref<any>({
    dialog: false,
    loading: false
})

watch(props, () => {
    console.log(props.data)
    workData.value = JSON.parse(JSON.stringify(props.data))
    console.log(workData.value)
})

const close = () => {
    emit("close")
}

const save = async () => {
    // 保存
    const obj = {
        title: workData.value.title,
        description: workData.value.description,
        url: workData.value.url,
    }
    workData.value.loading = true
    await editWorkById(workData.value._id, obj)
    workData.value.loading = false
    close()
}


</script>

<template>
    <v-row justify="center">
        <v-dialog
            v-model="dialog"
            persistent
            width="600"
        >
            <v-card class="pa-4">
                <v-card-title>
                    <span class="text-h5">{{title}}</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field
                        v-model="workData.title"
                        label="作品标题"
                        required
                    ></v-text-field>
                    <v-textarea
                        v-model="workData.description"
                        label="作品内容"
                        required
                    ></v-textarea>
                    <div v-if="workData.url">
                        <template v-for="(item, index) in workData.url" :key="index">
                            <v-textarea  v-model="workData.url[index]"></v-textarea>
                        </template>
                    </div>
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
                        :loading="workData.loading"
                    >
                        保存
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>