import React, { FunctionComponent } from "react"
import Part from "./Part"
import { Part as PartType } from "./types"

interface Props {
  part1: PartType
  part2: PartType
  part3: PartType
}

const Content: FunctionComponent<Props> = (props) => {
  return (
    <>
      <Part {...props.part1} />
      <Part {...props.part2} />
      <Part {...props.part3} />
    </>
  )
}

export default Content
