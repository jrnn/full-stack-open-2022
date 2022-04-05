import React, { FunctionComponent } from "react"

interface Props {
  header: string
  text: string
  votes: number
}

const Anecdote: FunctionComponent<Props> = ({ header, text, votes }) => (
  <>
    <h1>
      {header}
    </h1>
    <p>
      {text}
    </p>
    <p>
      This anecdote has {votes} votes.
    </p>
  </>
)

export default Anecdote
