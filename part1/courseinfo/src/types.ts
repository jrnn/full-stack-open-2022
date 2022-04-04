export interface Course {
  name: string
  parts: Array<Part>
}

export interface Part {
  name: string
  exercises: number
}
