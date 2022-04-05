import React, { useState } from "react"
import Anecdote from "./Anecdote"
import { anecdotes } from "./anecdotes"
import Button from "./Button"
import { getIndexOfMaxValue, getRandomIndex } from "./utils"

const App = () => {
  const [ selected, setSelected ] = useState(0)
  const [ votes, setVotes ] = useState(Array(anecdotes.length).fill(0) as Array<number>)
  const mostVoted = getIndexOfMaxValue(votes)

  const setRandomAnecdote = () => setSelected(getRandomIndex(anecdotes))
  const incrementVotes = () => setVotes(votes.map((n, index) => index === selected ? n + 1 : n))

  return (
    <>
      <Anecdote
        header="Here's an anecdote"
        text={anecdotes[selected] as string}
        votes={votes[selected] as number}
      />
      <Button
        label="Vote!"
        handleClick={incrementVotes}
      />
      <Button
        label="Next, please!"
        handleClick={setRandomAnecdote}
      />
      <Anecdote
        header="Anecdote with most votes"
        text={anecdotes[mostVoted] as string}
        votes={votes[mostVoted] as number}
      />
    </>
  )
}

export default App
