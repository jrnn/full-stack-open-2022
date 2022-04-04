import React, { FunctionComponent } from "react"
import { Course as CourseType } from "./types"

interface Props {
  course: CourseType
}

const Course: FunctionComponent<Props> = ({ course }) => {
  return (
    <h1>
      {course.name}
    </h1>
  )
}

export default Course
