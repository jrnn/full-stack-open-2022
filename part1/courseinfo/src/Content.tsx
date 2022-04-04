import React, { FunctionComponent } from "react"
import Part from "./Part"
import { Part as PartType } from "./types"

interface Props {
  parts: Array<PartType>
}

const Content: FunctionComponent<Props> = ({ parts }) => {
  return (
    <>
      <Part {...parts[0]} />
      <Part {...parts[1]} />
      <Part {...parts[2]} />
    </>
  )
}

export default Content
