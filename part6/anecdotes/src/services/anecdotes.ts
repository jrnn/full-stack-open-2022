import axios from "axios"
import { Anecdote } from "../types"

const baseUri = "http://localhost:3001/anecdotes"

export const fetchAnecdotes = async (): Promise<Array<Anecdote>> => {
  const response = await axios.get<Array<Anecdote>>(baseUri)
  return response.data
}
