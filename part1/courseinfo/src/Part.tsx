import React, { FunctionComponent } from "react"

interface Props {
  part: string
  exercises: number
}

const Part: FunctionComponent<Props> = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  )
}

export default Part
