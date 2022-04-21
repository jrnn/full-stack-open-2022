interface Identifiable {
  id: number
}

export interface Note extends Identifiable {
  content: string
}

export interface Person extends Identifiable {
  name: string
  number: string
}
