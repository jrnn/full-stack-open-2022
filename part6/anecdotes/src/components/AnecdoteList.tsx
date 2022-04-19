import React, { FunctionComponent } from "react"
import { Anecdote } from "../types"

interface Props {
  anecdotes: ReadonlyArray<Anecdote>
  voteForAnecdote: (id: number) => void
}

export const AnecdoteList: FunctionComponent<Props> = ({ anecdotes, voteForAnecdote }) => {
  return (
    <div>
      {anecdotes.map(({ id, content, votes }) =>
        <div key={id}>
          <div>
            {content}
          </div>
          <div>
            has {votes} votes
            <button onClick={() => voteForAnecdote(id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}
