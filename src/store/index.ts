import { InjectionKey } from 'vue'
import { Store, createStore } from 'vuex';
import { IRootStore, ISnackBar } from './rootStoreTypes';

export const key: InjectionKey<Store<IRootStore>> = Symbol('store');

const mutations = {
    setSnackbar(state: IRootStore, snackInfo: ISnackBar) {
        state.snackbar = snackInfo
    },

    setMobile(state: IRootStore, val: boolean) {
        state.isMobile = val
    },

    setMenuExpand(state: IRootStore, val: boolean) {
        state.menuExpand = val
    }
}

export const store = createStore<IRootStore>({
    state: {
        count: 0,
        aaa: '',
        snackbar: {},
        isMobile: false,
        menuExpand: false
    },
    mutations: mutations,
})


