import React, { FunctionComponent } from "react"

interface Props {
  text: string
  value: number | string
}

export const StatisticLine: FunctionComponent<Props> = ({ text, value }) => (
  <tr>
    <td>
      {text}
    </td>
    <td>
      {value}
    </td>
  </tr>
)
