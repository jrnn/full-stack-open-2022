import React, { FunctionComponent } from "react"

interface Props {
  text: string
  value: number | string
}

const StatisticLine: FunctionComponent<Props> = ({ text, value }) => (
  <div>
    {text}: {value}
  </div>
)

export default StatisticLine
