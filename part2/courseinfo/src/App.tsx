import React from "react"
import Course from "./Course"
import Content from "./Content"
import Total from "./Total"
import { Course as CourseType } from "./types"

const App = () => {
  const course: CourseType = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Course course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
