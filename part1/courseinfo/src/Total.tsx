import React, { FunctionComponent } from "react"
import { Part } from "./types"

interface Props {
  parts: Array<Part>
}

const Total: FunctionComponent<Props> = ({ parts }) => {
  const total = parts
    .map(p => p.exercises)
    .reduce((acc, next) => acc + next)

  return (
    <p>
      Number of exercises {total}
    </p>
  )
}

export default Total
