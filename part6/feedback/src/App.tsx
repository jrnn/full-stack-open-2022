import React, { useState } from "react"
import { Button } from "./components/Button"
import { Header } from "./components/Header"
import { Statistics } from "./components/Statistics"

const incrementState = (state: number, setState: (n: number) => void) => {
  return () => setState(state + 1)
}

const App = () => {
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)

  return (
    <>
      <Header header="Give feedback" />
      <Button
        label="good"
        handleClick={incrementState(good, setGood)}
      />
      <Button
        label="neutral"
        handleClick={incrementState(neutral, setNeutral)}
      />
      <Button
        label="bad"
        handleClick={incrementState(bad, setBad)}
      />
      <Header header="Statistics" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </>
  )
}

export default App
