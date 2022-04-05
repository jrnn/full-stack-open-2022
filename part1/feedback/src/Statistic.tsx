import React, { FunctionComponent } from "react"

interface Props {
  text: string
  score: number | string
}

const Statistic: FunctionComponent<Props> = ({ text, score }) => (
  <div>
    {text}: {score}
  </div>
)

export default Statistic
