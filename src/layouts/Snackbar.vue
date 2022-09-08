<script setup lang="ts">
import { computed, ref, watch, Ref } from 'vue';
import {store} from "../store";
import {ISnackBar} from "../store/rootStoreTypes";



let snackbar: Ref<any> = ref<ISnackBar>({
    show: false,
    message: ''
})

const getSnackbarInfo: Ref<any> = computed(() => {
    console.log(store.state.snackbar)
    return store.state.snackbar
})


watch(getSnackbarInfo, (newVal: ISnackBar) => {
    console.log(newVal)
    if (newVal.show) {
        snackbar.value = newVal
    }
},{
    deep: true
})

</script>


<template>
<!--    <div>{{ snackbar }}</div>-->

    <v-snackbar
        v-model="snackbar.show"
    >
        {{ snackbar.message }}

        <template v-slot:actions>
            <v-btn
                color="primary"
                variant="text"
                @click="snackbar.show = false"
            >
                Close
            </v-btn>
        </template>
    </v-snackbar>

</template>