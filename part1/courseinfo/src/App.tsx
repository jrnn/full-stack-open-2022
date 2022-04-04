import React from "react"
import Course from "./Course"
import Content from "./Content"
import Total from "./Total"
import { Part } from "./types"

const App = () => {
  const course = "Half Stack application development"
  const part1: Part = {
    name: "Fundamentals of React",
    exercises: 10
  }
  const part2: Part = {
    name: "Using props to pass data",
    exercises: 7
  }
  const part3: Part = {
    name: "State of a component",
    exercises: 14
  }
  return (
    <div>
      <Course course={course} />
      <Content
        part1={part1}
        part2={part2}
        part3={part3}
      />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

export default App
