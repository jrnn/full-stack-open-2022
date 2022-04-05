import React, { FunctionComponent } from "react"
import { Part } from "../types"

interface Props {
  parts: Array<Part>
}

const Total: FunctionComponent<Props> = ({ parts }) => {
  const total = parts
    .map(part => part.exercises)
    .reduce((prev, next) => prev + next, 0)

  return (
    <p>
      <em>Total of {total} exercises</em>
    </p>
  )
}

export default Total
