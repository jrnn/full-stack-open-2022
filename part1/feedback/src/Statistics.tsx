import React, { FunctionComponent } from "react"
import Statistic from "./Statistic"

interface Props {
  good: number
  neutral: number
  bad: number
}

const Statistics: FunctionComponent<Props> = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positiveShare = 100 * good / total

  return (
    <>
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

export default Statistics
