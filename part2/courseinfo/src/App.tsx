import React from "react"
import Course from "./components/Course"
import { courses } from "./courses"

const App = () => (
  <div>
    <h1>
      Web dev curriculum
    </h1>
    {courses.map(course =>
      <Course
        key={course.id}
        course={course}
      />
    )}
  </div>
)

export default App
