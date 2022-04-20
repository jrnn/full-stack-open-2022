import React, { FormEvent } from "react"
import { connect, ConnectedProps } from "react-redux"
import { setAnecdotesFilter } from "../reducers/filters"
import { AppDispatch, AppState } from "../store"

const mapStateToProps = (state: AppState) => ({
  filter: state.filters.anecdotes
})
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setFilter: (value: string) => dispatch(setAnecdotesFilter(value))
})
const connector = connect(mapStateToProps, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

export const AnecdoteFilter = connector(({ filter, setFilter }: Props) => {
  // const filter = useAppSelector(state => state.filters.anecdotes)
  // const dispatch = useAppDispatch()
  // const editFilter = ({ currentTarget }: FormEvent<HTMLInputElement>) =>
  //   dispatch(setAnecdotesFilter(currentTarget.value))

  const editFilter = ({ currentTarget }: FormEvent<HTMLInputElement>) =>
    setFilter(currentTarget.value)

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
})
