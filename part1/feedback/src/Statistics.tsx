import React, { FunctionComponent } from "react"
import StatisticLine from "./StatisticLine"

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
    <table>
      <tbody>
        <StatisticLine
          text="good"
          value={good}
        />
        <StatisticLine
          text="neutral"
          value={neutral}
        />
        <StatisticLine
          text="bad"
          value={bad}
        />
        <StatisticLine
          text="total"
          value={total}
        />
        <StatisticLine
          text="average"
          value={(good - bad) / total}
        />
        <StatisticLine
          text="positive"
          value={`${100 * good / total} %`}
        />
      </tbody>
    </table>
  )
}

export default Statistics
