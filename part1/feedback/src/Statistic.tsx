import React, { FunctionComponent } from "react"

interface Props {
  text: string
  score: number
}

const Statistic: FunctionComponent<Props> = ({ text, score }) => (
  <div>
    {text}: {score}
  </div>
)

export default Statistic
