import React, { FunctionComponent } from "react"
import Part from "./Part"
import { Part as PartType } from "./types"

interface Props {
  parts: Array<PartType>
}

const Content: FunctionComponent<Props> = ({ parts }) => {
  return (
    <>
      <Part part={parts[0] as PartType} />
      <Part part={parts[1] as PartType} />
      <Part part={parts[2] as PartType} />
    </>
  )
}

export default Content
