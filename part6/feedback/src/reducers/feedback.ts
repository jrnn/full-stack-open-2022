type FeedbackAction = Readonly<{
  type: "INCREMENT_GOOD" | "INCREMENT_NEUTRAL" | "INCREMENT_BAD"
}>

export type FeedbackState = Readonly<{
  good: number,
  neutral: number,
  bad: number
}>

export const feedbackReducer = (state: FeedbackState, { type }: FeedbackAction): FeedbackState => {
  switch (type) {
    case "INCREMENT_GOOD":
      return {
        ...state,
        good: state.good + 1
      }
    case "INCREMENT_NEUTRAL":
      return {
        ...state,
        neutral: state.neutral + 1
      }
    case "INCREMENT_BAD":
      return {
        ...state,
        bad: state.bad + 1
      }
    default:
      throw new Error("You're doing something wrong, sahib. And I'm being informative about it.")
  }
}
