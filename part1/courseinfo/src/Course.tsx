import React, { FunctionComponent } from "react"

interface Props {
  course: string
}

const Course: FunctionComponent<Props> = ({ course }) => {
  return (
    <h1>
      {course}
    </h1>
  )
}

export default Course
