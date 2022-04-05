import React, { FunctionComponent } from "react"
import { Part as PartType } from "./types"

interface Props {
  part: PartType
}

const Part: FunctionComponent<Props> = ({ part }) => {
  const { name, exercises } = part
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

export default Part
