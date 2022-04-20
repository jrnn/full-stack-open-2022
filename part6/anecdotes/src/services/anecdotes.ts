import axios from "axios"
import { Anecdote } from "../types"

const baseUri = "http://localhost:3001/anecdotes"

export const fetchAnecdotes = async (): Promise<Array<Anecdote>> => {
  const response = await axios.get<Array<Anecdote>>(baseUri)
  return response.data
}

export const postAnecdote = async (content: string): Promise<Anecdote> => {
  const response = await axios.post<Anecdote>(baseUri, { content, votes: 0 })
  return response.data
}
