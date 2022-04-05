import React, { FunctionComponent } from "react"
import { Course as CourseType } from "../types"
import Content from "./Content"
import Header from "./Header"

interface Props {
  course: CourseType
}

const Course: FunctionComponent<Props> = ({ course }) => (
  <>
    <Header header={course.name} />
    <Content parts={course.parts} />
  </>
)

export default Course
