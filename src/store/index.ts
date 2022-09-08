import { InjectionKey } from 'vue'
import { Store, createStore } from 'vuex';
import { IRootStore, ISnackBar } from './rootStoreTypes';

export const key: InjectionKey<Store<IRootStore>> = Symbol('store');

const mutations = {
    setSnackbar(state: IRootStore, snackInfo: ISnackBar) {
        state.snackbar = snackInfo
    }
}

export const store = createStore<IRootStore>({
    state: {
        count: 0,
        aaa: '',
        snackbar: {}
    },
    mutations: mutations,
})


