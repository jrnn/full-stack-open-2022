import React, { FunctionComponent } from "react"
import { Part as PartType } from "../types"

interface Props {
  part: PartType
}

const Part: FunctionComponent<Props> = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

export default Part
