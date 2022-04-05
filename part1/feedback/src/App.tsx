import React, { useState } from "react"
import Button from "./Button"
import Statistics from "./Statistics"
import Title from "./Title"

const incrementState = (state: number, setState: (n: number) => void) => {
  return () => setState(state + 1)
}

const App = () => {
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)

  return (
    <>
      <Title title={"Give feedback"} />
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
      <Title title="Statistics" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </>
  )
}

export default App
