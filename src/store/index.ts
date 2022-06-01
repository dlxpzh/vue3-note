import { InjectionKey } from "vue";
import { useStore as baseUseStore, createStore, Store } from "vuex";
export interface State {
    count: number
}
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    state() {
        return {
            count: 0
        }
    },
    mutations: {
        setCount(state, count: number) {
            state.count = count
        }
    },
    getters: {
        getCount: (state) => {
            return state.count
        }
    }
})
export function useStore(): Store<unknown> {
    return baseUseStore(key)
}