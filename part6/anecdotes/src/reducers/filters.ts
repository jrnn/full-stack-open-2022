import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
  anecdotes: ""
}

const slice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setAnecdotesFilter: (state, { payload: anecdotes }: PayloadAction<string>) => {
      return {
        ...state,
        anecdotes
      }
    }
  }
})

export const { setAnecdotesFilter } = slice.actions
export default slice.reducer
