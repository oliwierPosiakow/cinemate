import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


//pageSlice is created for easy control of current page of results
interface Page {
    value: number
}

const initialState = { value: 1 } as Page

const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        increment(state) {
            state.value++
        },
        decrement(state) {
            state.value > 1 ? state.value-- : ''
        },
        setDefault(state){
            state.value = 1
        }
    },
})

export const { increment, decrement, setDefault} = pageSlice.actions
export default pageSlice.reducer