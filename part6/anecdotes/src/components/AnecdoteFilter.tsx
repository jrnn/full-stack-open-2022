import React, { FormEvent } from "react"
import { setAnecdotesFilter } from "../reducers/filters"
import { useAppDispatch, useAppSelector } from "../store"

export const AnecdoteFilter = () => {
  const filter = useAppSelector(state => state.filters.anecdotes)
  const dispatch = useAppDispatch()
  const editFilter = ({ currentTarget }: FormEvent<HTMLInputElement>) =>
    dispatch(setAnecdotesFilter(currentTarget.value))

  return (
    <div style={{ marginBottom: 10 }}>
      Filter:
      <input
        onChange={editFilter}
        placeholder="type something"
        value={filter}
      />
    </div>
  )
}
