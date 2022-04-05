import React, { FunctionComponent } from "react"
import Part from "./Part"
import { Part as PartType } from "../types"

interface Props {
  parts: Array<PartType>
}

const Content: FunctionComponent<Props> = ({ parts }) => (
  <>
    {parts.map(part =>
      <Part
        key={part.id}
        part={part}
      />
    )}
  </>
)

export default Content
