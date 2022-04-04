import React, { FunctionComponent } from "react"
import Part from "./Part"

interface Props {
  part1: string
  exercises1: number
  part2: string
  exercises2: number
  part3: string
  exercises3: number
}

const Content: FunctionComponent<Props> = (props) => {
  return (
    <>
      <Part
        part={props.part1}
        exercises={props.exercises1}
      />
      <Part
        part={props.part2}
        exercises={props.exercises2}
      />
      <Part
        part={props.part3}
        exercises={props.exercises3}
      />
    </>
  )
}

export default Content
