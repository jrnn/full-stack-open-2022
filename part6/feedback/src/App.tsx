import React, { useReducer } from "react"
import { Button } from "./components/Button"
import { Header } from "./components/Header"
import { Statistics } from "./components/Statistics"
import { feedbackReducer, FeedbackState } from "./reducers/feedback"

const initialFeedback: FeedbackState = {
  good: 0,
  neutral: 0,
  bad: 0
}

export const App = () => {
  const [ feedback, dispatch ] = useReducer(feedbackReducer, initialFeedback)
  return (
    <>
      <Header header="Give feedback" />
      <Button
        label="good"
        handleClick={() => dispatch({ type: "INCREMENT_GOOD" })}
      />
      <Button
        label="neutral"
        handleClick={() => dispatch({ type: "INCREMENT_NEUTRAL" })}
      />
      <Button
        label="bad"
        handleClick={() => dispatch({ type: "INCREMENT_BAD" })}
      />
      <Header header="Statistics" />
      <Statistics feedback={feedback} />
    </>
  )
}
