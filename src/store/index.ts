import { InjectionKey } from 'vue'
import { Store, createStore } from 'vuex';
import { IRootStore } from './rootStoreTypes';

export const key: InjectionKey<Store<IRootStore>> = Symbol('store');

export const store = createStore<IRootStore>({
    state: {
        count: 0,
        aaa: '',
    }
})