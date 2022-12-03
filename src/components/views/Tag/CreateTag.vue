<script setup lang="ts">

import {ref, Ref} from "vue";
import {addTag} from "../../../api/tag";
import {store} from "../../../store";

let dialog: Ref<boolean> = ref(false)
let name: Ref<string> = ref("")
let icon: Ref<string> = ref("")
let type: Ref<number> = ref(1)

async function add(){
    let res = await addTag({name: name.value, icon: icon.value, type: type.value})
    if(res.code == 200){
        store.commit('setSnackbar', {
            show: true,
            message: '添加成功'
        })
        close()
    }else{
        store.commit('setSnackbar', {
            show: true,
            message: '添加失败'
        })
    }
}

function close(){
    name.value = "";
    icon.value = "";
    dialog.value = false;
}

interface TaskDataDTO {
    [key: string]: string | number
}

let selectType: TaskDataDTO[] = [
    { value: 1, name: "收入" },
    { value: 2, name: "支出" }
]


</script>

<template>
    <div>
        <v-btn
            color="primary"
            @click="dialog = true"
            flat
        >
            添加标签
        </v-btn>

        <v-dialog
            :persistent="true"
            v-model="dialog"
            :height="600"
            :width="500"
        >
            <v-card min-width="500" class="pb-4 pt-2">
                <v-card-title class="ml-2 d-flex justify-space-between">
                    <div>添加标签</div>
                    <v-icon icon="mdi-vuetify" color="red" @click="close"></v-icon>
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="name" label="请输入名称"></v-text-field>
                    <v-text-field v-model="icon" label="请选择图标"></v-text-field>
                    <v-select label="请选择类型" :items="selectType" v-model="type" item-title="name" item-value="value"></v-select>
                    <div class="d-flex justify-end">
                        <v-btn class="mt-3" color="primary" :flat="true" size="large" @click="add">添加</v-btn>
                        <v-btn class="mt-3 ml-12" color="primary" variant="outlined" :flat="true" size="large" @click="close">取消</v-btn>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>