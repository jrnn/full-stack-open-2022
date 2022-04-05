import React, { FunctionComponent } from "react"
import Statistic from "./Statistic"

interface Props {
  good: number
  neutral: number
  bad: number
}

const Statistics: FunctionComponent<Props> = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  if (total === 0) {
    return (
      <p>
        No feedback given yet, go ahead and click away!
      </p>
    )
  }
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
        score={(good - bad) / total}
      />
      <Statistic
        text="positive"
        score={`${100 * good / total} %`}
      />
    </>
  )
}

export default Statistics
