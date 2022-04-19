import React, { FunctionComponent } from "react"
import { FeedbackState } from "../reducers/feedback"
import { StatisticLine } from "./StatisticLine"

interface Props {
  feedback: FeedbackState
}

export const Statistics: FunctionComponent<Props> = ({ feedback }) => {
  const { good, neutral, bad } = feedback
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
