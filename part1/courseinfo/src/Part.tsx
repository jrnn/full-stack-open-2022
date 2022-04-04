import React, { FunctionComponent } from "react"
import { Part as PartType } from "./types"

const Part: FunctionComponent<PartType> = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

export default Part
