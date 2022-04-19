import { feedbackReducer, FeedbackState } from "./feedback"

const state: FeedbackState = {
  good: 3,
  neutral: 2,
  bad: 1
}

describe("feedback reducer", () => {
  it("given 'INCREMENT_GOOD' then should increment 'good' by one", () => {
    const newState = feedbackReducer(state, { type: "INCREMENT_GOOD" })
    expect(newState).toEqual({
      good: 4,
      neutral: 2,
      bad: 1
    })
  })

  it("given 'INCREMENT_NEUTRAL' then should increment 'neutral' by one", () => {
    const newState = feedbackReducer(state, { type: "INCREMENT_NEUTRAL" })
    expect(newState).toEqual({
      good: 3,
      neutral: 3,
      bad: 1
    })
  })

  it("given 'INCREMENT_BAD' then should increment 'bad' by one", () => {
    const newState = feedbackReducer(state, { type: "INCREMENT_BAD" })
    expect(newState).toEqual({
      good: 3,
      neutral: 2,
      bad: 2
    })
  })
})
