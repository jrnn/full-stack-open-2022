import { Course } from "./types";

export const courses: Array<Course> = [
  {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        id: 1,
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        id: 2,
        name: "Using props to pass data",
        exercises: 7
      },
      {
        id: 3,
        name: "State of a component",
        exercises: 14
      },
      {
        id: 4,
        name: "All you need to know about hooks",
        exercises: 42
      }
    ]
  },
  {
    id: 2,
    name: "Node Express",
    parts: [
      {
        id: 1,
        name: "Routers",
        exercises: 13
      },
      {
        id: 2,
        name: "Middleware",
        exercises: 19
      },
      {
        id: 3,
        name: "Error handling",
        exercises: 23
      }
    ]
  }
]
