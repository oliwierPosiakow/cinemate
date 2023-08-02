import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

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
    },
})

export const { increment, decrement} = pageSlice.actions
export default pageSlice.reducer