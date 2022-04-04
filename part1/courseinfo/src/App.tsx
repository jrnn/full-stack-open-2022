import React from "react"
import Course from "./Course"
import Content from "./Content"
import Total from "./Total"
import { Part } from "./types"

const App = () => {
  const course = "Half Stack application development"
  const parts: Array<Part> = [
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
  return (
    <div>
      <Course course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App
