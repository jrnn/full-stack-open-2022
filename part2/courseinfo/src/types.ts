interface Identifiable {
  id: number
}

export interface Course extends Identifiable {
  name: string
  parts: Array<Part>
}

export interface Part extends Identifiable {
  name: string
  exercises: number
}
