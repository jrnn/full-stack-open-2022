export interface AnecdoteDto {
  content: string,
  author: string,
  info: string,
}

export interface Anecdote extends AnecdoteDto {
  id: number,
  votes: number
}
