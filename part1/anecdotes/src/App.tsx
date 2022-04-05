import React, { useState } from "react"
import Button from "./Button"
import { getRandomElement } from "./utils"

const anecdotes = [
  "If it hurts, do it more often.",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time... The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
  "Program testing can be used to show the presence of bugs, but never to show their absence!",
  "Prolific programmers contribute to certain disaster.",
  "Let us change our traditional attitude to the construction of programs. Instead of imagining that our main task is to instruct a computer what to to, let us concentrate rather on explaining to human beings what we want a computer to do.",
  "It's better to wait for a productive programmer to become available than it is to wait for the first available programmer to become productive.",
  "Good judgment comes from experience, and experience comes from bad judgment."
]

const App = () => {
  const [ selected, setSelected ] = useState(anecdotes[0] as string)
  const setRandomAnecdote = () => setSelected(getRandomElement(anecdotes))

  return (
    <>
      <p>
        {selected}
      </p>
      <Button
        label="Next, please!"
        handleClick={setRandomAnecdote}
      />
    </>
  )
}

export default App
