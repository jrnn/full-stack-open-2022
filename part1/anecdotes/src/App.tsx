import React, { useState } from "react"
import { anecdotes } from "./anecdotes"
import Button from "./Button"
import { getRandomIndex } from "./utils"

const App = () => {
  const [ selected, setSelected ] = useState(0)
  const [ votes, setVotes ] = useState(Array(anecdotes.length).fill(0) as Array<number>)

  const setRandomAnecdote = () => setSelected(getRandomIndex(anecdotes))
  const incrementVotes = () => setVotes(votes.map((n, index) => index === selected ? n + 1 : n))

  return (
    <>
      <p>
        {anecdotes[selected]}
      </p>
      <p>
        This anecdote has {votes[selected]} votes.
      </p>
      <Button
        label="Vote!"
        handleClick={incrementVotes}
      />
      <Button
        label="Next, please!"
        handleClick={setRandomAnecdote}
      />
    </>
  )
}

export default App
