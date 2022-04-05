import React, { useState } from "react"
import Button from "./Button"
import Statistic from "./Statistic"
import Title from "./Title"

const incrementState = (state: number, setState: (n: number) => void) => {
  return () => setState(state + 1)
}

const App = () => {
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)

  const total = good + neutral + bad
  const average = (good - bad) / total
  const positiveShare = 100 * good / total

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
      <Statistic
        text="good"
        score={good}
      />
      <Statistic
        text="neutral"
        score={neutral}
      />
      <Statistic
        text="bad"
        score={bad}
      />
      <Statistic
        text="total"
        score={total}
      />
      <Statistic
        text="average"
        score={average}
      />
      <Statistic
        text="positive"
        score={`${positiveShare} %`}
      />
    </>
  )
}

export default App
